import { Router } from "express";
import productsController from "../controller/productsController";
import { categories, category } from "./categories";

const router = Router();

router.use("/categories", categories);
router.use("/category", category);

router.get("/", productsController.index);
router.post("/", productsController.insert);
router.get("/:id", productsController.show);
router.put("/:id", productsController.update);
router.delete("/:id", productsController.remove);

export { router };
