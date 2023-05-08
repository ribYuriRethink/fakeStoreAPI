import { Router } from "express";
import productsController from "../controller/productsController";
import { categories, category } from "./categories";
import middleware from "../middleware/dataValidator";
import { tokenVerify } from "../middleware/tokenValidator";

const router = Router();

router.use("/categories", categories);
router.use("/category", category);

router.get("/", productsController.index);
router.post(
  "/",
  tokenVerify,
  middleware.productDataValidator,
  productsController.insert
);
router.get("/:id", middleware.idValidator, productsController.show);
router.patch(
  "/:id",
  tokenVerify,
  middleware.idValidator,
  middleware.productDataUpdateValidator,
  productsController.update
);
router.delete(
  "/:id",
  tokenVerify,
  middleware.idValidator,
  productsController.remove
);

export { router };
