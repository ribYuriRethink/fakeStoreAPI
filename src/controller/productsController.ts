import { Request, Response } from "express";
import knex from "knex";
import config from "../../knexfile";
import { Product, DatabaseProduct, makeProductOutput } from "./function&types";
import productService from "../services/productService";

const knexInstance = knex(config);

const index = async (req: Request, res: Response) => {
  try {
    const products = await productService.index();
    res.status(200).send(products);
  } catch (error: any) {
    res.send({ error: error.message });
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const product = await productService.show(parseInt(id));
    res.status(200).send(product);
  } catch (error: any) {
    res.send({ error: error.message });
  }
};

const insert = async (req: Request, res: Response) => {
  try {
    const product = req.body;
    const newProductID = await productService.insert(product);
    res.status(201).send({ id: newProductID[0], ...product });
  } catch (error: any) {
    res.send({ error: error.message });
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updatedProduct: any = req.body;
    await productService.update(parseInt(id), updatedProduct);
    res.status(200).send({ id, ...updatedProduct });
  } catch (error: any) {
    res.send({ error: error.message });
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await productService.remove(parseInt(id));
    res.status(200).send({ msg: "Produto deletado!" });
  } catch (error: any) {
    res.send({ error: error.message });
  }
};

export default { index, insert, show, update, remove };
