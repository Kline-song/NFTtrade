const Base = require('./base');
const uuid = require('uuid');

class Order extends Base { 
  // 定义参数默认值为 order 表
  constructor(props = 'order'){
    super(props);
  }
  
  async createorder (product_id, seller_id, order_amount) {
    const order_id = uuid.v4(); // 生成唯一的 product_id
    const order_status = 1; // order_status只有3个值，0 已取消，1 待交易，2 已交易
    const create_time = new Date().toISOString().slice(0, 19).replace('T', ' ');
    return this.insert({ order_id, order_status, create_time, product_id, seller_id, order_amount });
  }
}

module.exports = new Order();