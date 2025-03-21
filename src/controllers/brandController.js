import * as brandService from '../services/brandService.js';

export const createBrand = async (req, res) => {
  try {
    const result = await brandService.createBrand(req.body);
    return res.status(201).json({
      errCode: result.errCode,
      errMessage: result.errMessage,
      data: result.data
    });
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: `Server error: ${error.message}`,
      data: null
    });
  }
};

export const getAllBrands = async (req, res) => {
  try {
    const result = await brandService.getAllBrands();
    return res.status(200).json({
      errCode: result.errCode,
      errMessage: result.errMessage,
      data: result.data
    });
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: `Server error: ${error.message}`,
      data: null
    });
  }
};

export const getBrandById = async (req, res) => {
  try {
    const result = await brandService.getBrandById(req.params.id);
    return res.status(200).json({
      errCode: result.errCode,
      errMessage: result.errMessage,
      data: result.data
    });
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: `Server error: ${error.message}`,
      data: null
    });
  }
};

export const updateBrand = async (req, res) => {
  try {
    const result = await brandService.updateBrand(req.body);
    return res.status(200).json({
      errCode: result.errCode,
      errMessage: result.errMessage,
      data: result.data
    });
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: `Server error: ${error.message}`,
      data: null
    });
  }
};

export const deleteBrand = async (req, res) => {
  try {
    const result = await brandService.deleteBrand(req.params.id);
    return res.status(200).json({
      errCode: result.errCode,
      errMessage: result.errMessage,
      data: result.data
    });
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: `Server error: ${error.message}`,
      data: null
    });
  }
};