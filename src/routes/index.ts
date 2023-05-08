import { Router } from "express";
import { router as products } from "./products";
import { user } from "./auth";
import { login } from "./auth";

const router = Router();

router.use("/products", products);
router.use("/newUser", user);
router.use("/login", login);

export { router };
