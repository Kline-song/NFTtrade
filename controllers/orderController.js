// orderController

const Order = require('../models/order.js');
const user = require('../models/user.js');

// 以下为未实现的函数伪代码

const orderController = {

  // 创建一个订单
  createOrder: async function (req, res, next) {
    try {
      const { seller_id, product_id, order_amount } = req.body;


      // 创建订单
      const order = await Order.createOrder(product_id, seller_id, order_amount);

      await order.save();

      res.json({ code: 200, message: '订单创建成功', data: order });
    } catch (error) {
      res.status(500).json({ code: 500, message: '创建订单时发生错误', error: error.message });
    }
  },

  // 展示一个订单
  showOrder: async function (req, res, next) {
    try {
      // 获取订单ID
      const order_id = req.params.order_id;

      // 从数据库中获取订单数据
      const order = await Order.findById(order_id);

      if (!order) {
        // 如果订单不存在，则返回相应的错误响应
        return res.status(404).json({
          code: 404,
          message: '订单未找到'
        });
      }
      // 返回订单数据给用户
      res.status(200).json({
        code: 200,
        message: '订单获取成功',
        data: order
      });
    } catch (error) {
      res.status(500).json({
        code: 500,
        message: '获取订单时发生错误',
        error: error.message
      });
    }
  },

  //取消一个订单
  cancelOrder: async function (req, res, next) {
    try {
      // 获取订单ID
      const order_id = req.params.order_id;

      // 从数据库中获取订单数据
      const order = await Order.findById(order_id);

      if (!order) {
        return res.status(404).json({
          code: 404,
          message: '订单未找到'
        });
      }

      if (order.order_status === 0) {
        return res.status(400).json({
          code: 400,
          message: '订单已取消'
        });
      }

      order.order_status = 0;
      await order.save();

      res.status(200).json({
        code: 200,
        message: '订单已成功取消',
        data: order
      });
    } catch (error) {
      res.status(500).json({
        code: 500,
        message: '取消订单时发生错误',
        error: error.message
      });
    }
  },

  //交易一个订单
  getTransactionOrder: async function (req, res, next) {
    try {
      const { order_id } = req.params;

      // 从数据库中获取订单数据
      const order = await Order.findById(order_id);

      if (!order) {
        return res.status(404).json({
          code: 404,
          message: '订单未找到'
        });
      }

      // 处理交易过程
      // 减少买家资产（假设有相关的买家资产字段）
      const buyer = await user.findById(order.buyer_id);
      buyer.currancy -= order.order_amount;
      await buyer.save();

      // 增加卖家资产（假设有相关的卖家资产字段）
      const seller = await user.findById(order.seller_id);
      seller.currancy += order.order_amount;
      await seller.save();

      // 修改商品归属权（假设有相关的商品归属权字段）
      const product = await product.findById(order.product_id);
      product.owner_id = order.buyer_id;
      await product.save();

      // 更新订单状态和买家ID
      order.order_status = 2;  // 假设状态2表示交易完成
      order.buyer_id = req.body.buyer_id;
      await order.save();

      // 返回订单信息和处理结果
      res.status(200).json({
        code: 200,
        message: '交易处理成功',
        data: order
      });
    } catch (error) {
      res.status(500).json({
        code: 500,
        message: '处理交易时发生错误',
        error: error.message
      });
    }
  },

  //将订单加入购物车
  pending_paymentOrder: async function (req, res, next) {
    try {
      // 获取订单ID
      const order_id = req.params.order_id;

      // 从数据库中获取订单数据
      const order = await Order.findById(order_id);

      if (!order) {
        return res.status(404).json({
          code: 404,
          message: '订单未找到'
        });
      }

      if (order.order_status === 3) {
        return res.status(400).json({
          code: 400,
          message: '订单已加入购物车'
        });
      }

      order.order_status = 3;
      await order.save();

      res.status(200).json({
        code: 200,
        message: '订单已成功加入购物车',
        data: order
      });
    } catch (error) {
      res.status(500).json({
        code: 500,
        message: '订单加入购物车时发生错误',
        error: error.message
      });
    }
  },
  // 有关订单的其他方法
  // ### 请你补充或完善 ###
}

module.exports = orderController;