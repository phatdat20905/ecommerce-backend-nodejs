'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
      order_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // references: { model: 'users', key: 'user_id' },
        onDelete: 'SET NULL'
      },
      total_amount: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled'),
        defaultValue: 'pending'
      },
      shipping_address: {
        type: Sequelize.TEXT
      },
      payment_method_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        // references: { model: 'payment_methods', key: 'payment_method_id' },
        onDelete: 'SET NULL'
      },
      discount_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        // references: { model: 'discounts', key: 'discount_id' },
        onDelete: 'SET NULL'
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('orders');
  }
};