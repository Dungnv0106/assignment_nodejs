import express from "express";

import { checkPermission } from "../middlewares/checkPermission";
import {
  addCategory,
  deleteCategory,
  getAllCategory,
  getOneCategory,
  updateCategory,
} from "../controllers/category";

const router = express.Router();

router.get("/categories", getAllCategory);
router.get("/categories/:id", getOneCategory);
router.post("/categories", checkPermission, addCategory);
router.patch("/categories/:id", checkPermission, updateCategory);
router.delete("/categories/:id", checkPermission, deleteCategory);

export default router;
