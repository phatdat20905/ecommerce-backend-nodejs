import express from 'express';
import * as userController from '../controllers/userController.js';
import { authenticateToken, authorizeRole } from '../middleware/auth.js';
const router = express.Router();

// Không cần xác thực 
router.post('/register', userController.handleRegister);
router.post('/login', userController.handleLogin);
router.post('/refresh-token', userController.refreshToken);

// Cần xác thực
router.post('/logout', authenticateToken, userController.logout);
router.get('/get-user-by-id', userController.getUserById);
router.get('/all', userController.getAllUsers);
router.put("/update-user", userController.handleUpdateUser);
router.delete("/delete-user", userController.handleDeleteUser);
// router.delete('/:id', authenticateToken, authorizeRole(['admin']), userController.deleteUser);
// router.get('/all', authenticateToken, authorizeRole(['admin']), userController.getAllUsers); 
export default router;