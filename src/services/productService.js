import db from '../models/index.js';

// Tạo sản phẩm
export const createProduct = async (productData) => {
  try {
    const product = await db.Product.create(productData);
    return {
      errCode: 0,
      errMessage: 'Product created successfully',
      data: product
    };
  } catch (error) {
    return {
      errCode: -1,
      errMessage: `Error creating product: ${error.message}`
    };
  }
};

// Lấy tất cả sản phẩm
export const getAllProducts = async () => {
  try {
    const products = await db.Product.findAll();
    return {
      errCode: 0,
      errMessage: 'Get all products successfully',
      data: products
    };
  } catch (error) {
    return {
      errCode: -1,
      errMessage: `Error fetching products: ${error.message}`
    };
  }
};

// Lấy sản phẩm theo ID
export const getProductById = async (id) => {
  try {
    const { product_id, ...brandData } = data; // Lấy product_id từ data
    if (!product_id || isNaN(product_id)) {
      return {
        errCode: 1,
        errMessage: 'Invalid product ID'
      };
    }
    const product = await db.Product.findByPk(id);
    if (!product) {
      return {
        errCode: 2,
        errMessage: 'Product not found'
      };
    }
    return {
      errCode: 0,
      errMessage: 'Get product successfully',
      data: product
    };
  } catch (error) {
    return {
      errCode: -1,
      errMessage: `Error fetching product: ${error.message}`
    };
  }
};


// Cập nhật sản phẩm
export const updateProduct = async (data) => {
  try {
    const { product_id, ...productData } = data; // Lấy product_id từ data
    if (!product_id || isNaN(product_id)) {
      return {
        errCode: 1,
        errMessage: 'Invalid product ID'
      };
    }
    const product = await db.Product.findByPk(product_id);
    if (!product) {
      return {
        errCode: 2,
        errMessage: 'Product not found'
      };
    }
    // Cập nhật thông tin
    await db.Product.update(productData, { where: { product_id } });
    const updatedProduct = await db.Product.findByPk(product_id); 
    return {
      errCode: 0,
      errMessage: 'Product updated successfully',
      data: updatedProduct
    };
  } catch (error) {
    return {
      errCode: -1,
      errMessage: `Error updating product: ${error.message}`
    };
  }
};

// Xóa sản phẩm
export const deleteProduct = async (id) => {
  try {
    if (!id || isNaN(id)) {
      return {
        errCode: 1,
        errMessage: 'Invalid product ID'
      };
    }
    const product = await db.Product.findByPk(id);
    if (!product) {
      return {
        errCode: 2,
        errMessage: 'Product not found'
      };
    }
    await product.destroy();
    return {
      errCode: 0,
      errMessage: 'Product deleted successfully'
    };
  } catch (error) {
    return {
      errCode: -1,
      errMessage: `Error deleting product: ${error.message}`
    };
  }
};