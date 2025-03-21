import express from 'express';
import * as brandController from '../controllers/brandController.js';
import { authenticateToken, authorizeRole } from '../middleware/auth.js';

const router = express.Router();

router.post('/create-brand', authenticateToken, authorizeRole(['admin']), brandController.createBrand);
router.get('/all', brandController.getAllBrands); // Không cần xác thực
router.get('/get-brand-by-id', brandController.getBrandById); // Không cần xác thực
router.put('/update-brand', authenticateToken, authorizeRole(['admin']), brandController.updateBrand);
router.delete('/delete-brand', authenticateToken, authorizeRole(['admin']), brandController.deleteBrand);

export default router;