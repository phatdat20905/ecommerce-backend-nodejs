import * as categoryService from '../services/categoryService.js';

export const createCategory = async (req, res) => {
  try {
    const result = await categoryService.createCategory(req.body);
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

export const getAllCategories = async (req, res) => {
  try {
    const result = await categoryService.getAllCategories();
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

export const getCategoryById = async (req, res) => {
  try {
    const result = await categoryService.getCategoryById(req.query.id);
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

export const updateCategory = async (req, res) => {
  try {
    const result = await categoryService.updateCategory(req.body);
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

export const deleteCategory = async (req, res) => {
  try {
    const result = await categoryService.deleteCategory(req.query.id);
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