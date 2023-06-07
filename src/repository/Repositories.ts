import knex from "knex";
import config from "../../knexfile";
import { DatabaseProduct } from "../types/types";

const knexInstance = knex(config);

const indexProducts = (orderBy: any) =>
  knexInstance("products")
    .select("*", "products.id as id", "categories.id as categoryID")
    .join("categories", "categories.id", "=", "products.category_id")
    .orderBy(
      orderBy.column ? orderBy.column : "id",
      orderBy.order ? orderBy.order : "asc"
    );

const searchProductsByTitle = (query: string) =>
  knexInstance("products")
    .select("*", "products.id as id", "categories.id as categoryID")
    .join("categories", "categories.id", "=", "products.category_id")
    .whereLike("title", `%${query.toLowerCase()}%`);

const getProduct = (id: number) =>
  knexInstance("products")
    .select("*", "products.id as id", "categories.id as categoryID")
    .join("categories", "categories.id", "=", "products.category_id")
    .where("products.id", id);

const insertProduct = (product: DatabaseProduct) =>
  knexInstance("products").insert(product);

const updateProduct = (id: number, product: DatabaseProduct) =>
  knexInstance("products").update(product).where({ id });

const removeProduct = (id: number) =>
  knexInstance("products").delete().where({ id });

const getCategory = (category: string | undefined) =>
  knexInstance("categories").select("id").where({ name: category });

const indexCategories = () => knexInstance("categories").select("name");

const getProductsByCategory = (category: string) =>
  knexInstance("products")
    .select("*", "products.id as id", "categories.id as categoryID")
    .join("categories", "categories.id", "=", "products.category_id")
    .where("categories.name", category);

const insertCategory = (newCategory: { name: string }) =>
  knexInstance("categories").insert(newCategory);

const updateCategory = (id: number, newName: string) =>
  knexInstance("categories").update({ name: newName }).where({ id });

const removeCategory = (id: number) =>
  knexInstance("categories").delete().where({ id });

const getUser = (username: string) =>
  knexInstance("user").select("*").where({ name: username });

const createNewUser = (username: string, password: string) =>
  knexInstance("user").insert({ name: username, password });

export default {
  indexProducts,
  searchProductsByTitle,
  getProduct,
  insertProduct,
  updateProduct,
  removeProduct,
  getCategory,
  indexCategories,
  getProductsByCategory,
  insertCategory,
  updateCategory,
  removeCategory,
  getUser,
  createNewUser,
};
