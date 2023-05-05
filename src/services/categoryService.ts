import Repository from "../repository/Repositories";
import { Category, DatabaseProduct, makeProductOutput } from "../types/types";
import { makeError } from "../middleware/errorHandler";

const index = async () => {
  const categories: Category[] = await Repository.indexCategories();
  if (categories.length === 0)
    throw makeError({ message: "O banco está vazio!", status: 400 });

  const allCategories: string[] = categories.map((item) => item.name);
  return allCategories;
};

const showByCategory = async (category: string) => {
  const productsByCategorie: DatabaseProduct[] =
    await Repository.getProductsByCategory(category);

  if (!productsByCategorie[0]) {
    return [];
  }

  return makeProductOutput(productsByCategorie);
};

const insert = async (name: string) => {
  const existsCategory: Category[] = await Repository.getCategory(name);
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
  const category: number = await Repository.removeCategory(id);
  if (!category)
    throw makeError({ message: "Categoria não existe!", status: 400 });
};

export default { index, showByCategory, insert, update, remove };
