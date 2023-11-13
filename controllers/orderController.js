// orderController
const Order = require('../models/order.js');
const User = require('../models/user.js');
const Product = require('../models/product.js');

const orderController = {
  // 创建一个订单
  createOrder: async function (req, res, next) {
    try {
      const { product_id, order_amount } = req.body;
      console.log('Product ID:', product_id);
      console.log('Order Amount:', order_amount);
      // 验证请求参数
      if (!product_id || !order_amount) {
        throw new Error('product_id或order_amount参数缺失');
      }

      const seller_id = req.session.user_id;

      const orderList = await Order.findOrdersByProductId(product_id);
      console.log('Order:', orderList);
      
      if (orderList.length > 0) {
        throw new Error('商品正在出售中');
      }
      

      // 验证seller_id是否存在
      if (!seller_id) {
        throw new Error('seller_id不存在');
      }

      // 创建订单
      const order = await Order.createOrder(product_id, seller_id, order_amount);
      // 验证创建结果
      if (!order) {
        throw new Error('订单创建失败');
      }

      res.json({ code: 200, message: '订单创建成功', data: order });

    } catch (error) {
      // 错误处理
      if (error.message.includes('缺失') || error.message.includes('类型错误') || error.message.includes('商品正在出售')) {
        res.status(400).json({ code: 400, message: error.message });
      } else {
        res.status(500).json({ code: 500, message: '创建订单时发生错误', error: error.message });
        console.error(error);
      }
    }
  },

  //交易一个订单
  getTransactionOrder: async function (req, res, next) {
    try {
      const productId = req.params.id;
      console.log('Product ID:', productId);

      // 从数据库中获取订单数据
      const order = await Order.findOrdersByProductId(productId);
      console.log('Order:', order);

      const userId = req.session.user_id;
      console.log('User ID:', userId);

      if (!order) {
        return res.status(404).json({
          code: 404,
          message: '订单未找到'
        });
      }

      // 处理交易过程
      // 减少买家资产（假设有相关的买家资产字段）
      const buyer = await User.findById(userId);
      console.log('Buyer before transaction:', buyer);
      await User.update(buyer.user_id, { currency: buyer.currency - order[0].order_amount });
      console.log('Buyer after transaction:', await User.findById(userId));

      // 增加卖家资产（假设有相关的卖家资产字段）
      const seller = await User.findById(order[0].seller_id);
      console.log('Seller before transaction:', seller);
      await User.update(seller.user_id, { currency: seller.currency + order[0].order_amount });
      console.log('Seller after transaction:', await User.findById(order[0].seller_id));

      // 修改商品归属权（假设有相关的商品归属权字段）
      const product = await Product.findById(order[0].product_id);
      console.log('Product before transaction:', product);
      product.owner_id = userId;
      await Product.update(product.product_id, { owner_id: userId });
      console.log('Product after transaction:', await Product.findById(order[0].product_id));

      // 更新订单状态和买家ID
      await Order.update(order[0].order_id, { order_status: 2, buyer_id: userId });
      console.log('Order after transaction:', await Order.findById(order[0].order_id));

      // 返回订单信息和处理结果
      res.status(200).json({
        code: 200,
        message: '交易处理成功',
        data: order
      });
    } catch (error) {
      console.log('Error:', error);
      res.status(500).json({
        code: 500,
        message: '处理交易时发生错误',
        error: error.message
      });
    }
  },

  //展示用户的所有历史订单
  showAllOrders: async function (req, res, next) {
    try {
      const userId = req.session.user_id;
      console.log('User ID:', userId);

      const sellerId = req.session.user_id;
      const buyerId = req.session.user_id;
      console.log('Seller ID:', sellerId);
      console.log('Buyer ID:', buyerId);
      // 从数据库中获取订单数据
      const sellerOrders = await Order.findOrdersBySellerId(sellerId);
      const buyerOrders = await Order.findOrdersByBuyerId(buyerId);
      console.log('Seller Orders:', sellerOrders);
      console.log('Buyer Orders:', buyerOrders);

      // 遍历卖家订单，获取并添加产品信息
      for (let order of sellerOrders) {
        const product = await Product.findById(order.product_id);
        order.productDescription = product.product_description;
        order.productCoverImage_url = product.coverImage_url;
      }

      // 遍历买家订单，获取并添加产品信息
      for (let order of buyerOrders) {
        const product = await Product.findById(order.product_id);
        order.productDescription = product.product_description;
        order.productCoverImage_url = product.coverImage_url;
      }
      console.log('Seller Orders:', sellerOrders);
      console.log('Buyer Orders:', buyerOrders);
      if (!sellerOrders || !buyerOrders) {
        return res.status(404).json({
          code: 404,
          message: '订单未找到'
        });
      }

      // 返回订单数据给用户
      res.status(200).json({
        code: 200,
        message: '订单获取成功',
        data: {
          sellerOrders: sellerOrders,
          buyerOrders: buyerOrders
        }
      });
    } catch (error) {
      res.status(500).json({
        code: 500,
        message: '获取订单时发生错误',
        error: error.message
      });
    }
  },
}

module.exports = orderController;