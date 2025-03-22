import express from 'express';
import * as cartController from '../controllers/cartController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticateToken, cartController.addToCart);
router.get('/', authenticateToken, cartController.getCart);
router.put('/', authenticateToken, cartController.updateCartItem); // id từ query
router.delete('/', authenticateToken, cartController.removeFromCart); // id từ query

export default router;