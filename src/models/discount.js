'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Discount extends Model {
    static associate(models) {
      Discount.hasMany(models.Order, { foreignKey: 'discount_id' });
    }
  }
  Discount.init({
    discount_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    code: {
      type: DataTypes.STRING(20),
      unique: true,
      allowNull: false
    },
    discount_percent: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false
    },
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Discount',
    tableName: 'discounts',
    timestamps: false
  });
  return Discount;
};