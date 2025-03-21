import * as productService from '../services/productService.js';

export const createProduct = async (req, res) => {
  try {
    const result = await categoryService.createProduct(req.body);
    return res.status(201).json({
      errCode: result.errCode,
      errMessage: result.errMessage,
      data: result.data
    });
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: `Server error: ${error.message}`,
    });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const result = await categoryService.getAllProducts();
    return res.status(200).json({
      errCode: result.errCode,
      errMessage: result.errMessage,
      data: result.data
    });
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: `Server error: ${error.message}`,
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const result = await categoryService.getProductById(req.query.id);
    return res.status(200).json({
      errCode: result.errCode,
      errMessage: result.errMessage,
      data: result.data
    });
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: `Server error: ${error.message}`,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const result = await categoryService.updateProduct(req.body);
    return res.status(200).json({
      errCode: result.errCode,
      errMessage: result.errMessage,
      data: result.data
    });
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: `Server error: ${error.message}`,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const result = await categoryService.deleteProduct(req.query.id);
    return res.status(200).json({
      errCode: result.errCode,
      errMessage: result.errMessage,
      data: result.data
    });
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: `Server error: ${error.message}`,
    });
  }
};