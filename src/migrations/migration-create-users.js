'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      user_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER // Thêm DataTypes
      },
      username: {
        type: Sequelize.DataTypes.STRING(50), // Thêm DataTypes
        unique: true,
        allowNull: false
      },
      email: {
        type: Sequelize.DataTypes.STRING(100), // Thêm DataTypes
        unique: true,
        allowNull: false
      },
      password: {
        type: Sequelize.DataTypes.STRING(255), // Thêm DataTypes
        allowNull: false
      },
      full_name: {
        type: Sequelize.DataTypes.STRING(100) // Thêm DataTypes
      },
      gender: { // Trường mới
        type: Sequelize.DataTypes.ENUM('male', 'female', 'other'), // Thêm DataTypes
        allowNull: true
      },
      phone: {
        type: Sequelize.DataTypes.STRING(15) // Thêm DataTypes
      },
      address: {
        type: Sequelize.DataTypes.TEXT // Thêm DataTypes
      },
      image_url: { // Trường mới
        type: Sequelize.DataTypes.STRING(255), // Thêm DataTypes
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};