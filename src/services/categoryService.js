import db from '../models/index.js';

// Tạo danh mục
export const createCategory = async (categoryData) => {
  try {
    const category = await db.Category.create(categoryData);
    return {
      errCode: 0,
      errMessage: 'Category created successfully',
      data: category
    };
  } catch (error) {
    return {
      errCode: -1,
      errMessage: `Error creating category: ${error.message}`
    };
  }
};

// Lấy tất cả danh mục (bao gồm danh mục con)
export const getAllCategories = async () => {
  try {
    const categories = await db.Category.findAll({
      include: [
        { model: db.Category, as: 'children', required: false }
      ]
    });
    return {
      errCode: 0,
      errMessage: 'Get all categories successfully',
      data: categories
    };
  } catch (error) {
    return {
      errCode: -1,
      errMessage: `Error fetching categories: ${error.message}`
    };
  }
};

// Lấy danh mục theo ID
export const getCategoryById = async (id) => {
  try {
    if (!id || isNaN(id)) {
      return {
        errCode: 1,
        errMessage: 'Invalid category ID'
      };
    }
    const category = await db.Category.findByPk(id, {
      include: [
        { model: db.Category, as: 'children', required: false },
        { model: db.Category, as: 'parent', required: false }
      ]
    });
    if (!category) {
      return {
        errCode: 2,
        errMessage: 'Category not found'
      };
    }
    return {
      errCode: 0,
      errMessage: 'Get category successfully',
      data: category
    };
  } catch (error) {
    return {
      errCode: -1,
      errMessage: `Error fetching category: ${error.message}`
    };
  }
};

// Cập nhật danh mục
export const updateCategory = async (data) => {
  try {
    const { category_id, ...categoryData } = data; // Lấy category_id từ data
    if (!category_id || isNaN(category_id)) {
      return {
        errCode: 1,
        errMessage: 'Invalid category ID',
      };
    }
    const category = await db.Category.findByPk(category_id);
    if (!category) {
      return {
        errCode: 2,
        errMessage: 'Category not found',
      };
    }
    await db.Category.update(categoryData, { where: { category_id } });
    const updatedCategory = await db.Category.findByPk(category_id); 
    return {
      errCode: 0,
      errMessage: 'Category updated successfully',
      data: updatedCategory
    };
  } catch (error) {
    return {
      errCode: -1,
      errMessage: `Error updating category: ${error.message}`,
    };
  }
};

// Xóa danh mục
export const deleteCategory = async (id) => {
  try {
    if (!id || isNaN(id)) {
      return {
        errCode: 1,
        errMessage: 'Invalid category ID'
      };
    }
    const category = await db.Category.findByPk(id);
    if (!category) {
      return {
        errCode: 2,
        errMessage: 'Category not found'
      };
    }
    await category.destroy();
    return {
      errCode: 0,
      errMessage: 'Category deleted successfully'
    };
  } catch (error) {
    return {
      errCode: -1,
      errMessage: `Error deleting category: ${error.message}`
    };
  }
};