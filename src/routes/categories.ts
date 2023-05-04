import { Router } from "express";
import categoriesController from "../controller/categoriesController";
import middleware from "../middleware/dataValidator";

const categories = Router();
const category = Router();

categories.get("/", categoriesController.index);
categories.post(
  "/",
  middleware.categoryDataValidator,
  categoriesController.insert
);

category.get(
  "/:name",
  middleware.paramNameValidator,
  categoriesController.show
);

category.put(
  "/:id",
  middleware.idValidator,
  middleware.categoryDataValidator,
  categoriesController.update
);

category.delete("/:id", middleware.idValidator, categoriesController.remove);

export { categories, category };
