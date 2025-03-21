import * as userService from '../services/userService';

export const handleRegister = async (req, res) => {
    const { username, email, password, full_name, phone, address, image_url, gender } = req.body;
    const massage = await userService.registerUser({ username, email, password, full_name, phone, address, image_url, gender });
    return res.status(200).json(massage);
};


export const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    //check email exists
    if(!email || !password) {
      return res.status(500).json({
          errCode: 1,
          message: 'Mising inputs parameters!',
      });
    }
    const result = await userService.loginUser(email, password);
    if (result.errCode === 0) {
      res.status(200).json({
        errCode: result.errCode,
        message: result.errMessage,
        refreshToken: result.data.refreshToken,
        accessToken: result.data.accessToken,
        user: result.data.user
      });
    } else {
      res.status(400).json({ error: result.errMessage });
    }
  } catch (error) {
    res.status(500).json({ error: `Server error: ${error.message}` });
  }
};


export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ error: 'Refresh token is required' });
    }

    const result = await userService.refreshAccessToken(refreshToken);
    if (result.errCode === 0) {
      res.status(200).json({
        errCode: result.errCode,
        message: result.errMessage,
        accessToken: result.data.accessToken,
        refreshToken: result.data.refreshToken
      });
    } else {
      res.status(400).json({ error: result.errMessage });
    }
  } catch (error) {
    res.status(500).json({ error: `Server error: ${error.message}` });
  }
};


export const handleEditUser = async (req, res) => {
  try {
    const result = await userService.editUser(req.params.id, req.body);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({
      errCode: -1,
      message: 'Error from server'
    });
  }
};

// Xóa người dùng
export const handleDeleteUser = async (req, res) => {
  try {
    const result = await userService.deleteUser(req.params.id);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({
      errCode: -1,
      message: 'Error from server'
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.query.id);
    return res.status(200).json(user);
  } catch (e) {
    return res.status(500).json({
        errCode: -1,
        message: 'Error from server'
    });
  }
};

export const getAllUsers = async (req, res) => {
    const result = await userService.getAllUsers();
    return res.status(200).json(result);
};

