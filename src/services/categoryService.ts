import knex from "knex";
import config from "../../knexfile";
import Repository from "../repository/Repositories";
import { makeProductOutput } from "./function&types";
import { makeError } from "../middleware/errorHandler";

const knexInstance = knex(config);

const index = async () => {
  const categories = await Repository.indexCategories();
  if (categories.length === 0)
    throw makeError({ message: "O banco está vazio!", status: 400 });

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
  if (existsCategory.length)
    throw makeError({ message: "Categoria já existe!", status: 400 });

  const newCategory = { name };
  const id: number[] = await Repository.insertCategory(newCategory);
  return id[0];
};

const update = async (id: number, newName: string) => {
  const result: number = await Repository.updateCategory(id, newName);
  if (!result)
    throw makeError({ message: "Categoria não existe!", status: 400 });
};

const remove = async (id: number) => {
  const category = await Repository.removeCategory(id);
  if (!category)
    throw makeError({ message: "Categoria não existe!", status: 400 });
};

export default { index, showByCategory, insert, update, remove };
