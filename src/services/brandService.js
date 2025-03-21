import db from '../models/index.js';

// Tạo thương hiệu
export const createBrand = async (brandData) => {
  try {
    const brand = await db.Brand.create(brandData);
    return {
      errCode: 0,
      errMessage: 'Brand created successfully',
      data: brand
    };
  } catch (error) {
    return {
      errCode: -1,
      errMessage: `Error creating brand: ${error.message}`
    };
  }
};

// Lấy tất cả thương hiệu
export const getAllBrands = async () => {
  try {
    const brands = await db.Brand.findAll();
    return {
      errCode: 0,
      errMessage: 'Get all brands successfully',
      data: brands
    };
  } catch (error) {
    return {
      errCode: -1,
      errMessage: `Error fetching brands: ${error.message}`
    };
  }
};

// Lấy thương hiệu theo ID
export const getBrandById = async (id) => {
  try {
    if (!id || isNaN(id)) {
      return {
        errCode: 1,
        errMessage: 'Invalid brand ID'
      };
    }
    const brand = await db.Brand.findByPk(id);
    if (!brand) {
      return {
        errCode: 2,
        errMessage: 'Brand not found'
      };
    }
    return {
      errCode: 0,
      errMessage: 'Get brand successfully',
      data: brand
    };
  } catch (error) {
    return {
      errCode: -1,
      errMessage: `Error fetching brand: ${error.message}`
    };
  }
};

// Cập nhật thương hiệu
export const updateBrand = async (data) => {
  try {
    const { brand_id, ...brandData } = data; // Lấy brand_id từ data
    if (!brand_id || isNaN(brand_id)) {
      return {
        errCode: 1,
        errMessage: 'Invalid brand ID',
      };
    }
    const brand = await db.Brand.findByPk(brand_id);
    if (!brand) {
      return {
        errCode: 2,
        errMessage: 'Brand not found',
      };
    }
    await db.Brand.update(brandData, { where: { brand_id } });
    const updatedBrand = await db.Brand.findByPk(brand_id); 
    return {
      errCode: 0,
      errMessage: 'Brand updated successfully',
      data: updatedBrand
    };
  } catch (error) {
    return {
      errCode: -1,
      errMessage: `Error updating brand: ${error.message}`,
    };
  }
};

// Xóa thương hiệu
export const deleteBrand = async (id) => {
  try {
    if (!id || isNaN(id)) {
      return {
        errCode: 1,
        errMessage: 'Invalid brand ID'
      };
    }
    const brand = await db.Brand.findByPk(id);
    if (!brand) {
      return {
        errCode: 2,
        errMessage: 'Brand not found'
      };
    }
    await brand.destroy();
    return {
      errCode: 0,
      errMessage: 'Brand deleted successfully'
    };
  } catch (error) {
    return {
      errCode: -1,
      errMessage: `Error deleting brand: ${error.message}`
    };
  }
};