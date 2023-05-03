import { Request, Response, NextFunction } from "express";
import knex from "knex";
import config from "../../knexfile";
import { Category, Product, makeProductOutput } from "./function&types";
import categoryService from "../services/categoryService";

const knexInstance = knex(config);

const index = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allCategories: Category[] = await categoryService.index();
    res.status(200).send(allCategories);
  } catch (error: any) {
    next(error);
  }
};

const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const name: string = req.params.name;
    const productsByCategorie = await categoryService.showByCategory(name);
    res.status(200).send(productsByCategorie);
  } catch (error: any) {
    next(error);
  }
};

const insert = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body;
    const id: number = await categoryService.insert(name);
    res.status(201).send({ id: id, name });
  } catch (error: any) {
    next(error);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const newName: string = req.body.name;
    await categoryService.update(parseInt(id), newName);
    res.status(200).send({ id, name: newName });
  } catch (error: any) {
    next(error);
  }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    await categoryService.remove(parseInt(id));
    res.status(200).send({ msg: "Categoria deletada!" });
  } catch (error: any) {
    next(error);
  }
};

export default { index, show, insert, update, remove };
