import knex from "knex";
import config from "../../knexfile";
import Repository from "../repository/Repositories";
import { makeProductOutput } from "./function&types";

const knexInstance = knex(config);

const index = async () => {
  const categories = await Repository.indexCategories();
  if (categories.length === 0) throw new Error("O banco está vazio!");

  const allCategories = categories.map((item) => item.name);
  return allCategories;
};

const showByCategory = async (category: string) => {
  const productsByCategorie: any[] = await Repository.getProductsByCategory(
    category
  );

  if (!productsByCategorie[0]) {
    return [];
  }

  return makeProductOutput(productsByCategorie);
};

const insert = async (name: string) => {
  const existsCategory = await Repository.getCategory(name);
  if (existsCategory.length) throw new Error("Categoria já existe!");

  const newCategory = { name };
  const id: number[] = await Repository.insertCategory(newCategory);
  return id[0];
};

const update = async (id: number, newName: string) => {
  const result: number = await Repository.updateCategory(id, newName);
  if (!result) throw new Error("Essa Categoria não existe");
};

const remove = async (id: number) => {
  const category = await Repository.removeCategory(id);
  if (!category) throw new Error("Essa categoria não existe!");
};

export default { index, showByCategory, insert, update, remove };
