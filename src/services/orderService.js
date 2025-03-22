import db from '../models/index.js';

// Tạo đơn hàng
export const createOrder = async (userId, orderData) => {
  try {
    const { total_amount, shipping_address, payment_method_id, discount_id } = orderData;
    if (!total_amount || isNaN(total_amount)) {
      return {
        errCode: 1,
        errMessage: 'Invalid total amount'
      };
    }

    const order = await db.Order.create({
      user_id: userId,
      total_amount,
      shipping_address,
      payment_method_id,
      discount_id,
      status: 'pending'
    });

    return {
      errCode: 0,
      errMessage: 'Order created successfully',
      data: order
    };
  } catch (error) {
    return {
      errCode: -1,
      errMessage: `Error creating order: ${error.message}`
    };
  }
};

// Lấy tất cả đơn hàng của người dùng
export const getUserOrders = async (userId) => {
  try {
    const orders = await db.Order.findAll({
      where: { user_id: userId },
      include: [
        { model: db.User, attributes: ['username', 'email'] },
        { model: db.OrderDetail },
        { model: db.PaymentMethod },
        { model: db.Discount }
      ]
    });
    return {
      errCode: 0,
      errMessage: 'Get user orders successfully',
      data: orders
    };
  } catch (error) {
    return {
      errCode: -1,
      errMessage: `Error fetching orders: ${error.message}`
    };
  }
};

// Lấy đơn hàng theo ID
export const getOrderById = async (query) => {
  try {
    const { id } = query;
    if (!id || isNaN(id)) {
      return {
        errCode: 1,
        errMessage: 'Invalid order ID'
      };
    }
    const order = await db.Order.findByPk(id, {
      include: [
        { model: db.User, attributes: ['username', 'email'] },
        { model: db.OrderDetail },
        { model: db.PaymentMethod },
        { model: db.Discount }
      ]
    });
    if (!order) {
      return {
        errCode: 2,
        errMessage: 'Order not found'
      };
    }
    return {
      errCode: 0,
      errMessage: 'Get order successfully',
      data: order
    };
  } catch (error) {
    return {
      errCode: -1,
      errMessage: `Error fetching order: ${error.message}`
    };
  }
};

// Cập nhật trạng thái đơn hàng (admin only)
export const updateOrderStatus = async (query, status) => {
  try {
    const { id } = query;
    if (!id || isNaN(id)) {
      return {
        errCode: 1,
        errMessage: 'Invalid order ID'
      };
    }
    const order = await db.Order.findByPk(id);
    if (!order) {
      return {
        errCode: 2,
        errMessage: 'Order not found'
      };
    }
    await db.Order.update({ status }, { where: { order_id: id } });
    const updatedOrder = await db.Order.findByPk(id);
    return {
      errCode: 0,
      errMessage: 'Order status updated successfully',
      data: updatedOrder
    };
  } catch (error) {
    return {
      errCode: -1,
      errMessage: `Error updating order: ${error.message}`
    };
  }
};

// Xóa đơn hàng (admin only)
export const deleteOrder = async (query) => {
  try {
    const { id } = query;
    if (!id || isNaN(id)) {
      return {
        errCode: 1,
        errMessage: 'Invalid order ID'
      };
    }
    const order = await db.Order.findByPk(id);
    if (!order) {
      return {
        errCode: 2,
        errMessage: 'Order not found'
      };
    }
    await order.destroy();
    return {
      errCode: 0,
      errMessage: 'Order deleted successfully'
    };
  } catch (error) {
    return {
      errCode: -1,
      errMessage: `Error deleting order: ${error.message}`
    };
  }
};