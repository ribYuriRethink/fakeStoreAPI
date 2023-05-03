import { Request, Response, NextFunction } from "express";
import knex from "knex";
import config from "../../knexfile";
import { Product, DatabaseProduct, makeProductOutput } from "./function&types";
import productService from "../services/productService";

const knexInstance = knex(config);

const index = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await productService.index();
    res.status(200).send(products);
  } catch (error: any) {
    next(error);
  }
};

const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const product = await productService.show(parseInt(id));
    res.status(200).send(product);
  } catch (error: any) {
    next(error);
  }
};

const insert = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = req.body;
    const newProductID = await productService.insert(product);
    res.status(201).send({ id: newProductID[0], ...product });
  } catch (error: any) {
    next(error);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const updatedProduct: any = req.body;
    await productService.update(parseInt(id), updatedProduct);
    res.status(200).send({ id, ...updatedProduct });
  } catch (error: any) {
    next(error);
  }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    await productService.remove(parseInt(id));
    res.status(200).send({ msg: "Produto deletado!" });
  } catch (error: any) {
    next(error);
  }
};

export default { index, insert, show, update, remove };
