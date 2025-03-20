'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsToMany(models.Role, { through: models.UserRole, foreignKey: 'user_id' });
      User.hasMany(models.Cart, { foreignKey: 'user_id' });
      User.hasMany(models.Order, { foreignKey: 'user_id' });
      User.hasMany(models.Review, { foreignKey: 'user_id' });
    }
  }
  User.init({
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    full_name: DataTypes.STRING(100),
    gender: DataTypes.ENUM('male', 'female', 'other'),
    phone: DataTypes.STRING(15),
    address: DataTypes.TEXT,
    image_url: DataTypes.STRING(255),
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false
  });
  return User;
};