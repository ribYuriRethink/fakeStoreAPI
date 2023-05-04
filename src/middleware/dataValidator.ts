import { NextFunction, Request, Response } from "express";
import { object, number, string } from "yup";

const idSchema = object({
  id: number().positive().required(),
});

const categoryNameSchema = object({
  name: string().required(),
});

const productSchema = object({
  title: string().required(),
  price: number().required(),
  description: string().required(),
  category: string().required(),
  image: string().required(),
  rating: object({
    rate: number().min(0).max(5).required(),
    count: number().required(),
  }),
});

const productPatchSchema = object({
  title: string(),
  price: number(),
  description: string(),
  category: string(),
  image: string(),
  rating: object({
    rate: number().min(0).max(5),
    count: number(),
  }),
});

const idValidator = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const paramId = { id: parseInt(req.params.id) };
    await idSchema.validate(paramId);
    next();
  } catch (error) {
    next(error);
  }
};

const productDataValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productData = req.body;
    await productSchema.validate(productData, { strict: true });
    next();
  } catch (error) {
    next(error);
  }
};

const productDataUpdateValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productData = req.body;
    await productPatchSchema.validate(productData, { strict: true });
    next();
  } catch (error) {
    next(error);
  }
};

const paramNameValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const paramData = req.params;
    await categoryNameSchema.validate(paramData, { strict: true });
    next();
  } catch (error) {
    next(error);
  }
};

const categoryDataValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categoryData = req.body;
    await categoryNameSchema.validate(categoryData, { strict: true });
    next();
  } catch (error) {
    next(error);
  }
};

export default {
  productDataValidator,
  productDataUpdateValidator,
  idValidator,
  paramNameValidator,
  categoryDataValidator,
};
