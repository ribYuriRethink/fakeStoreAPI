import { Router } from "express";
import categoriesController from "../controller/categoriesController";
import middleware from "../middleware/dataValidator";
import { tokenVerify } from "../middleware/tokenValidator";

const categories = Router();
const category = Router();

categories.get("/", categoriesController.index);
categories.post(
  "/",
  tokenVerify,
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
  tokenVerify,
  middleware.idValidator,
  middleware.categoryDataValidator,
  categoriesController.update
);

category.delete(
  "/:id",
  tokenVerify,
  middleware.idValidator,
  categoriesController.remove
);

export { categories, category };
