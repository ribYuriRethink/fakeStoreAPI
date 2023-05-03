import { Router } from "express";
import { router as products } from "./products";

const router = Router();

router.use("/products", products);

export { router };
