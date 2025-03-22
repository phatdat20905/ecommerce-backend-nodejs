import db from '../models/index.js';

// Thêm sản phẩm vào giỏ hàng
export const addToCart = async (userId, cartData) => {
  try {
    const { product_id, quantity } = cartData;
    if (!product_id || !quantity || isNaN(quantity)) {
      return {
        errCode: 1,
        errMessage: 'Invalid product ID or quantity'
      };
    }

    const product = await db.Product.findByPk(product_id);
    if (!product) {
      return {
        errCode: 2,
        errMessage: 'Product not found'
      };
    }

    const cartItem = await db.Cart.findOne({
      where: { user_id: userId, product_id }
    });

    if (cartItem) {
      await db.Cart.update(
        { quantity: cartItem.quantity + quantity },
        { where: { cart_id: cartItem.cart_id } }
      );
    } else {
      await db.Cart.create({
        user_id: userId,
        product_id,
        quantity,
        added_at: new Date()
      });
    }

    return {
      errCode: 0,
      errMessage: 'Added to cart successfully'
    };
  } catch (error) {
    return {
      errCode: -1,
      errMessage: `Error adding to cart: ${error.message}`
    };
  }
};

// Lấy giỏ hàng của người dùng
export const getCart = async (userId) => {
  try {
    const cartItems = await db.Cart.findAll({
      where: { user_id: userId },
      include: [{ model: db.Product }]
    });
    return {
      errCode: 0,
      errMessage: 'Get cart successfully',
      data: cartItems
    };
  } catch (error) {
    return {
      errCode: -1,
      errMessage: `Error fetching cart: ${error.message}`
    };
  }
};

// Cập nhật số lượng sản phẩm trong giỏ hàng
export const updateCartItem = async (query, quantity) => {
  try {
    const { id } = query; // id là cart_id
    if (!id || isNaN(id)) {
      return {
        errCode: 1,
        errMessage: 'Invalid cart item ID'
      };
    }
    if (!quantity || isNaN(quantity) || quantity <= 0) {
      return {
        errCode: 2,
        errMessage: 'Invalid quantity'
      };
    }
    const cartItem = await db.Cart.findByPk(id);
    if (!cartItem) {
      return {
        errCode: 3,
        errMessage: 'Cart item not found'
      };
    }
    await db.Cart.update({ quantity }, { where: { cart_id: id } });
    const updatedCartItem = await db.Cart.findByPk(id);
    return {
      errCode: 0,
      errMessage: 'Cart item updated successfully',
      data: updatedCartItem
    };
  } catch (error) {
    return {
      errCode: -1,
      errMessage: `Error updating cart: ${error.message}`
    };
  }
};

// Xóa sản phẩm khỏi giỏ hàng
export const removeFromCart = async (query) => {
  try {
    const { id } = query; // id là cart_id
    if (!id || isNaN(id)) {
      return {
        errCode: 1,
        errMessage: 'Invalid cart item ID'
      };
    }
    const cartItem = await db.Cart.findByPk(id);
    if (!cartItem) {
      return {
        errCode: 2,
        errMessage: 'Cart item not found'
      };
    }
    await cartItem.destroy();
    return {
      errCode: 0,
      errMessage: 'Removed from cart successfully'
    };
  } catch (error) {
    return {
      errCode: -1,
      errMessage: `Error removing from cart: ${error.message}`
    };
  }
};