import express from 'express';
import { addProduct, deleteProduct, getAll, getOne, updateProduct } from '../controllers/product';
const router = express.Router();

router.get('/products', getAll);
router.get('/products/:id', getOne);
router.post('/products', addProduct);
router.patch('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);
export default router;