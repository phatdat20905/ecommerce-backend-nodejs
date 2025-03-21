'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Brand extends Model {
    static associate(models) {
      Brand.hasMany(models.Product, { foreignKey: 'brand_id' });
    }
  }
  Brand.init({
    brand_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false
    },
    description: DataTypes.TEXT,
    logo_url: DataTypes.STRING(255),
  }, {
    sequelize,
    modelName: 'Brand',
  });
  return Brand;
};