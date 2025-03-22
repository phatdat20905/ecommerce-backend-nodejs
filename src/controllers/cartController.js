import * as cartService from '../services/cartService.js';

export const addToCart = async (req, res) => {
  try {
    const result = await cartService.addToCart(req.user.user_id, req.body);
    return res.status(result.errCode === 0 ? 200 : 400).json({
      errCode: result.errCode,
      errMessage: result.errMessage,
      data: result.data
    });
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: `Server error: ${error.message}`
    });
  }
};

export const getCart = async (req, res) => {
  try {
    const result = await cartService.getCart(req.user.user_id);
    return res.status(result.errCode === 0 ? 200 : 400).json({
      errCode: result.errCode,
      errMessage: result.errMessage,
      data: result.data
    });
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: `Server error: ${error.message}`
    });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const result = await cartService.updateCartItem(req.query, quantity);
    return res.status(result.errCode === 0 ? 200 : 400).json({
      errCode: result.errCode,
      errMessage: result.errMessage,
      data: result.data
    });
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: `Server error: ${error.message}`
    });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const result = await cartService.removeFromCart(req.query);
    return res.status(result.errCode === 0 ? 200 : 400).json({
      errCode: result.errCode,
      errMessage: result.errMessage,
      data: result.data
    });
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: `Server error: ${error.message}`
    });
  }
};