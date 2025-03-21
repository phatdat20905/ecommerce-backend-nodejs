import express from 'express';
import * as categoryController from '../controllers/categoryController.js';
import { authenticateToken, authorizeRole } from '../middleware/auth.js';

const router = express.Router();

router.post('/create-category', authenticateToken, authorizeRole(['admin']), categoryController.createCategory);
router.get('/all', categoryController.getAllCategories); // Không cần xác thực
router.get('/get-cat-by-id', categoryController.getCategoryById); // Không cần xác thực
router.put('/update-category', authenticateToken, authorizeRole(['admin']), categoryController.updateCategory);
router.delete('/delete-category', authenticateToken, authorizeRole(['admin']), categoryController.deleteCategory);

export default router;