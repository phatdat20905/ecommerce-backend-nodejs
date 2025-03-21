import express from 'express';
import * as productController from '../controllers/productController.js';
import { authenticateToken, authorizeRole } from '../middleware/auth.js';

const router = express.Router();

router.post('/create-product', authenticateToken, authorizeRole(['admin']), productController.createProduct);
router.get('/all', productController.getAllProducts); // Không cần xác thực
router.get('/get-product-by-id', productController.getProductById); // Không cần xác thực
router.put('/update-product', authenticateToken, authorizeRole(['admin']), productController.updateProduct);
router.delete('delete-product', authenticateToken, authorizeRole(['admin']), productController.deleteProduct);

export default router;