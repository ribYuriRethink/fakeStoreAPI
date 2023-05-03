import { Router } from "express";
import categoriesController from "../controller/categoriesController";

const categories = Router();
const category = Router();

categories.get("/", categoriesController.index);
categories.post("/", categoriesController.insert);
category.get("/:name", categoriesController.show);
category.put("/:id", categoriesController.update);
category.delete("/:id", categoriesController.remove);

export { categories, category };
