'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Category, { foreignKey: 'category_id' });
      Product.belongsTo(models.Brand, { foreignKey: 'brand_id' });
      Product.hasMany(models.Cart, { foreignKey: 'product_id' });
      Product.hasMany(models.OrderDetail, { foreignKey: 'product_id' });
      Product.hasMany(models.Review, { foreignKey: 'product_id' });
    }
  }
  Product.init({
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: DataTypes.TEXT,
    price: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false
    },
    stock: DataTypes.INTEGER,
    image_url: DataTypes.STRING(255),
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'products',
    timestamps: false
  });
  return Product;
};