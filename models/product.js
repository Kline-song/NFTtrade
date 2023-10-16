const Base = require('./base');
const uuid = require('uuid');

class Product extends Base { 
  // 定义参数默认值为 product 表
  constructor(props = 'product'){
    super(props);
  }
  
  async createProduct (nft_identifier, product_name, product_description, url, owner_id) {
    const product_id = uuid.v4(); // 生成唯一的 product_id
    return this.insert({ product_id, nft_identifier, product_name, product_description, url, owner_id });
  }
}

module.exports = new Product();