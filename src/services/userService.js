import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../models/index.js';

const salt = bcrypt.genSaltSync(10);

// Hàm băm mật khẩu 
const hashUserPassword = async (password) => {
    try {
      const hashPassword = await bcrypt.hash(password, salt);
      return hashPassword;
    } catch (error) {
      throw new Error(`Error hashing password: ${error.message}`);
    }
  };
  
  // Hàm kiểm tra email
  export const checkEmail = async (email) => {
    const user = await db.User.findOne({ where: { email } });
    return user !== null; // Trả về true nếu email đã tồn tại, false nếu chưa
  };
  
  // Hàm đăng ký người dùng
  export const registerUser = async (userData) => {
    // Kiểm tra email trước khi đăng ký
    const emailExists = await checkEmail(userData.email);
    if (emailExists) {
      return {
        errCode: 1,
        errMessage: 'Email already exists'
      };
    }
  
    // Băm mật khẩu
    const hashedPassword = await hashUserPassword(userData.password);
    // Tạo người dùng mới
    const user = await db.User.create({
      ...userData,
      password: hashedPassword
    });
    return {
      errCode: 0,
      errMessage: 'Register user successfully',
    };
  };

  export const loginUser = async (email, password) => {
    try {
      const userData = {}
      const user = await db.User.findOne({ where: { email } });
      if (!user) {
        return {
          errCode: 1,
          errMessage: 'User not found'
        };
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return {
          errCode: 2,
          errMessage: 'Invalid password'
        };
      }
  
      // Tạo access token (hết hạn sau 15 phút)
    const accessToken = jwt.sign(
      { user_id: user.user_id },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    // Tạo refresh token (hết hạn sau 7 ngày)
    const refreshToken = jwt.sign(
      { user_id: user.user_id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '7d' }
    );

    // Lưu refresh token vào database
    await db.RefreshToken.create({
      user_id: user.user_id,
      token: refreshToken,
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 ngày
    });
      
      // Loại bỏ password khỏi dữ liệu user trước khi trả về
      delete user.password;
      userData.user = user;
  
      return {
        errCode: 0,
        errMessage: 'Login successful',
        data: {
          accessToken,
          refreshToken,
          user: userData
        }
      };
    } catch (error) {
      return {
        errCode: -1,
        errMessage: `Error logging in: ${error.message}`
      };
    }
  };
  
// Hàm làm mới access token
export const refreshAccessToken = async (refreshToken) => {
  try {
    // Kiểm tra refresh token trong database
    const storedToken = await db.RefreshToken.findOne({ where: { token: refreshToken } });
    if (!storedToken) {
      return {
        errCode: 1,
        errMessage: 'Invalid refresh token'
      };
    }

    // Kiểm tra nếu refresh token đã hết hạn
    if (new Date() > storedToken.expires_at) {
      await storedToken.destroy(); // Xóa token hết hạn
      return {
        errCode: 2,
        errMessage: 'Refresh token expired'
      };
    }

    // Xác minh refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await db.User.findByPk(decoded.user_id);
    if (!user) {
      return {
        errCode: 3,
        errMessage: 'User not found'
      };
    }

    // Tạo access token mới
    const newAccessToken = jwt.sign(
      { user_id: user.user_id },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    return {
      errCode: 0,
      errMessage: 'Access token refreshed successfully',
      data: {
        accessToken: newAccessToken,
        refreshToken // Trả lại refresh token cũ
      }
    };
  } catch (error) {
    return {
      errCode: -1,
      errMessage: `Error refreshing token: ${error.message}`
    };
  }
};


// Hàm chỉnh sửa thông tin người dùng
export const editUser = async (id, userData) => {
  try {
    if (!id || isNaN(id)) {
      return {
        errCode: 1,
        errMessage: 'Invalid user ID'
      };
    }

    const user = await db.User.findByPk(id);
    if (!user) {
      return {
        errCode: 2,
        errMessage: 'User not found'
      };
    }

    // Nếu có password mới, băm lại
    if (userData.password) {
      userData.password = await hashUserPassword(userData.password);
    }

    // Cập nhật thông tin
    await user.update(userData);

    return {
      errCode: 0,
      errMessage: 'User updated successfully',
      data: user
    };
  } catch (error) {
    return {
      errCode: -1,
      errMessage: `Error updating user: ${error.message}`
    };
  }
};

// Hàm xóa người dùng
export const deleteUser = async (id) => {
  try {
    if (!id || isNaN(id)) {
      return {
        errCode: 1,
        errMessage: 'Invalid user ID'
      };
    }

    const user = await db.User.findByPk(id);
    if (!user) {
      return {
        errCode: 2,
        errMessage: 'User not found'
      };
    }

    await user.destroy();

    return {
      errCode: 0,
      errMessage: 'User deleted successfully'
    };
  } catch (error) {
    return {
      errCode: -1,
      errMessage: `Error deleting user: ${error.message}`
    };
  }
};

export const getUserById = async (id) => {
  try {
    // Kiểm tra nếu id không hợp lệ
    if (!id || isNaN(id)) {
      return {
        errCode: 1,
        errMessage: 'Invalid user ID'
      };
    }

    const user = await db.User.findOne({
      where: { user_id: id },
      attributes: { exclude: ['password'] }, // Loại bỏ trường password
      raw: false 
    });

    if (!user) {
      return {
        errCode: 2,
        errMessage: 'User not found'
      };
    }

    return {
      errCode: 0,
      errMessage: 'Get user successfully',
      data: user
    };
  } catch (error) {
    return {
      errCode: -1,
      errMessage: `Error from server: ${error.message}`
    };
  }
}

// Hàm lấy danh sách tất cả người dùng
export const getAllUsers = async () => {
  try {
    const users = await db.User.findAll({
      attributes: { exclude: ['password'] } // Loại bỏ password
    });

    return {
      errCode: 0,
      errMessage: 'Get all users successfully',
      data: users
    };
  } catch (error) {
    return {
      errCode: -1,
      errMessage: `Error fetching users: ${error.message}`
    };
  }
};