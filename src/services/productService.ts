import { makeError } from "../middleware/errorHandler";
import Repository from "../repository/Repositories";
import { Product, makeProductOutput, Category } from "./function&types";

const index = async () => {
  const products: Product[] = await Repository.indexProducts();
  const structuredProducts: Product[] = makeProductOutput(products);

  if (products.length === 0)
    throw makeError({ message: "O banco está vazio!", status: 400 });

  return structuredProducts;
};

const show = async (id: number) => {
  const product: Product[] = await Repository.getProduct(id);
  const structuredProducts: Product[] = makeProductOutput(product);

  if (structuredProducts.length === 0)
    throw makeError({ message: "Produto não existe!", status: 400 });

  return structuredProducts[0];
};

const insert = async (product: Product) => {
  const findCategory: Category[] = await Repository.getCategory(
    product.category
  );

  if (!findCategory[0])
    throw makeError({ message: "Categoria não existe!", status: 400 });

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
  } catch (error: any) {
    throw makeError({
      message: "Não foi possível inserir no banco!",
      status: 500,
      stack: error.stack,
    });
  }
};

const update = async (id: number, product: Product) => {
  const updatedProduct: any = { ...product };
  if (product.category) {
    const findCategory = await Repository.getCategory(product.category);

    if (!findCategory[0])
      throw makeError({ message: "Categoria não existe!", status: 400 });

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
  if (!result) throw makeError({ message: "Produto não existe!", status: 400 });

  return result;
};

const remove = async (id: number) => {
  const product: number = await Repository.removeProduct(id);
  if (!product)
    throw makeError({ message: "Produto não existe!", status: 400 });
};

export default { index, show, insert, update, remove };
