import knex from "knex";
import config from "./knexfile";

const knexInstace = knex(config);

const insertOnTableCategories = async () => {
  const allProductsData = await knexInstace("categories").select("*");
  if (allProductsData.length != 0) {
    return console.log("A tabela 'categories' já possui dados!");
  }

  const resultApiCategories = await fetch(
    "https://fakestoreapi.com/products/categories"
  ).then((request: any) => request.json());

  const categories = resultApiCategories.map((category: string) => ({
    name: category,
  }));

  await knexInstace("categories").insert(categories);
  console.log("Categories inserted with success!");
};

const insertOnTableProducts = async () => {
  const allProductsData = await knexInstace("products").select("*");
  if (allProductsData.length != 0) {
    return console.log("A tabela 'products' já possui dados!");
  }

  const resultApiProducts = await fetch(
    "https://fakestoreapi.com/products"
  ).then((request: any) => request.json());

  const getCategory = getCategoryId(
    await knexInstace("categories").select("*")
  );

  const products = resultApiProducts.map((item: any) => ({
    title: item.title,
    price: item.price,
    description: item.description,
    category_id: getCategory(item.category).id,
    image: item.image,
    rate: item.rating.rate,
    count: item.rating.count,
  }));

  await knexInstace("products").insert(products);
  console.log("Products inserted with success!");
};

const getCategoryId = (categories: any[]) => {
  return (category: string) => {
    const foundCategory = categories.filter((item) => item.name === category);
    return foundCategory[0];
  };
};

const populateDatabase = async () => {
  await insertOnTableCategories();
  await insertOnTableProducts();
};

populateDatabase()
  .then(() => console.log("Database populate terminated!"))
  .then(() => process.exit());

// no terminal -> ts-node seeds.ts || npx ts-node seeds.ts
