import express from "express";
import {
  addProduct,
  deleteProduct,
  getAll,
  getOne,
  updateProduct,
} from "../controllers/product";
import { checkPermission } from "../middlewares/checkPermission";
const router = express.Router();

router.get("/products", getAll);
router.get("/products/:id", getOne);
// router.post('/products', addProduct);
// router.patch('/products/:id', updateProduct);
// router.delete('/products/:id', deleteProduct);

router.post("/products", checkPermission, addProduct);
router.patch("/products/:id", checkPermission, updateProduct);
router.delete("/products/:id", checkPermission, deleteProduct);
export default router;
