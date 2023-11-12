const Base = require('./base');
const uuid = require('uuid');
const knex = require('../models/knex');

class Order extends Base {
  // 定义参数默认值为 order 表
  constructor(props = 'order') {
    super(props);
  }

  async createOrder(product_id, seller_id, order_amount) {
    try {
      const order_id = uuid.v4(); // 生成唯一的 order_id
      const order_status = 1; // order_status只有4个值，0 已取消，1 待交易，2 已交易，3 待付款
      const create_time = new Date().toISOString().slice(0, 19).replace('T', ' ');

      return await this.insert({ order_id, order_status, create_time, product_id, seller_id, order_amount });
    } catch (error) {
      console.error('Error in createorder:', error.message);
      throw error;  // 将错误向上抛出，以便调用者知道有错误发生
    }
  }

  // Get transaction history of an NFT 由productController调用
  async getNFTTransactionHistory(nftId) {
    // Implement DB query to fetch transaction history of a specific NFT using nftId
  }
  async findById(order_id) {
    return this.findBy(order_id, 'order_id');
  }
  async findOrdersByStatus(status) {
    try {
      const orders = await knex('order').where({ order_status: status });
      return orders;
    } catch (err) {
      throw err;
    }
  }
  async findOrdersByProductId(product_id) {
    try {
      const orders = await knex('order').where({ product_id, order_status: 1 });
      return orders;
    } catch (err) {
      throw err;
    }
  }
  async update(orderId, params) {
    return await knex('order').where('order_id', '=', orderId).update(params);
  }
  async findOrdersBySellerId(seller_id) {
    try {
      const orders = await knex('order').where({ seller_id: seller_id });
      return orders;
    } catch (err) {
      throw err;
    }
  }
  async findOrdersByBuyerId(buyer_id) {
    try {
      const orders = await knex('order').where({ buyer_id: buyer_id });
      return orders;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = new Order();