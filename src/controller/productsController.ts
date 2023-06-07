import { Request, Response, NextFunction } from "express";
import { Product } from "../types/types";
import productService from "../services/productService";

const index = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orderBy = req.query;
    const products: Product[] = await productService.index(orderBy);
    res.status(200).send(products);
  } catch (error: any) {
    next(error);
  }
};

const search = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = req.query.query;
    const products: Product[] = await productService.search(query);
    res.status(200).send(products);
  } catch (error: any) {
    next(error);
  }
};

const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const product: Product = await productService.show(parseInt(id));
    res.status(200).send(product);
  } catch (error: any) {
    next(error);
  }
};

const insert = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = req.body;
    const newProductID: number = await productService.insert(product);
    res.status(201).send({ id: newProductID, ...product });
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

export default { index, search, insert, show, update, remove };
