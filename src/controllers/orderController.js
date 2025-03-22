import * as orderService from '../services/orderService.js';

export const createOrder = async (req, res) => {
  try {
    const result = await orderService.createOrder(req.user.user_id, req.body);
    return res.status(result.errCode === 0 ? 201 : 400).json({
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

export const getUserOrders = async (req, res) => {
  try {
    const result = await orderService.getUserOrders(req.user.user_id);
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

export const getOrderById = async (req, res) => {
  try {
    const result = await orderService.getOrderById(req.query);
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

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const result = await orderService.updateOrderStatus(req.query, status);
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

export const deleteOrder = async (req, res) => {
  try {
    const result = await orderService.deleteOrder(req.query);
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