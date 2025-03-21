import jwt from 'jsonwebtoken';
import db from '../models/index.js';

// Middleware xác thực access token
export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Lấy token từ "Bearer <token>"

  if (!token) {
    return res.status(401).json({
      errCode: 1,
      message: 'No token provided'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await db.User.findByPk(decoded.user_id, {
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      return res.status(404).json({
        errCode: 2,
        message: 'User not found'
      });
    }

    req.user = user; // Gắn thông tin user vào req
    next();
  } catch (error) {
    return res.status(403).json({
      errCode: 3,
      message: 'Invalid or expired token'
    });
  }
};

// Middleware kiểm tra vai trò (role)
export const authorizeRole = (roles) => {
  return async (req, res, next) => {
    try {
      const userId = req.user.user_id; // Lấy từ authenticateToken
      const userRoles = await db.UserRole.findAll({
        where: { user_id: userId },
        include: [{ model: db.Role, attributes: ['name'] }]
      });

      const roleNames = userRoles.map(userRole => userRole.Role.name);
      const hasRole = roles.some(role => roleNames.includes(role));

      if (!hasRole) {
        return res.status(403).json({
          errCode: 4,
          message: 'Permission denied'
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        errCode: -1,
        message: `Error checking role: ${error.message}`
      });
    }
  };
};