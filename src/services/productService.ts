import Repository from "../repository/Repositories";
import { Product, makeProductOutput, Category } from "./function&types";

const index = async () => {
  const products: Product[] = await Repository.indexProducts();
  const structuredProducts: Product[] = makeProductOutput(products);

  if (products.length === 0) throw new Error("O banco está vazio!");

  return structuredProducts;
};

const show = async (id: number) => {
  const product: Product[] = await Repository.getProduct(id);
  const structuredProducts: Product[] = makeProductOutput(product);

  if (structuredProducts.length === 0) throw new Error("Produto não existe!");

  return structuredProducts[0];
};

const insert = async (product: Product) => {
  const findCategory: Category[] = await Repository.getCategory(
    product.category
  );

  if (!findCategory[0]) throw new Error("A categoria não existe!");

  const categoryId: number | undefined = findCategory[0].id;

  const newProduct: any = {
    ...product,
    category_id: categoryId,
    ...product.rating,
  };
  delete newProduct.rating;
  delete newProduct.category;

  try {
    const idInsertedProduct = await Repository.insertProduct(newProduct);
    return idInsertedProduct;
  } catch (error) {
    throw new Error("Não foi possível realizar a inserção");
  }
};

const update = async (id: number, product: Product) => {
  const updatedProduct: any = { ...product };
  if (product.category) {
    const findCategory = await Repository.getCategory(product.category);

    if (!findCategory[0]) throw new Error("A categoria não existe!");

    updatedProduct.category_id = findCategory[0].id;
    delete updatedProduct.category;
  }

  if (updatedProduct.rating) {
    updatedProduct.rate = product.rating.rate;
    updatedProduct.count = product.rating.count;
    delete updatedProduct.rating;
    delete updatedProduct.category;
  }

  const result = await Repository.updateProduct(id, updatedProduct);
  if (!result) throw new Error("Esse produto não existe!");

  return result;
};

const remove = async (id: number) => {
  const product: number = await Repository.removeProduct(id);
  if (!product) throw new Error("O produto não existe!");
};

export default { index, show, insert, update, remove };
