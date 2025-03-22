import express from 'express';
import * as orderController from '../controllers/orderController.js';
import { authenticateToken, authorizeRole } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticateToken, orderController.createOrder);
router.get('/my-orders', authenticateToken, orderController.getUserOrders);
router.get('/', authenticateToken, orderController.getOrderById); // id từ query
router.put('/status', authenticateToken, authorizeRole(['admin']), orderController.updateOrderStatus); // id từ query
router.delete('/', authenticateToken, authorizeRole(['admin']), orderController.deleteOrder); // id từ query

export default router;