const Base = require('./base');
const uuid = require('uuid');
const knex = require('../models/knex');

class Product extends Base {
  // 定义参数默认值为 product 表
  constructor(props = 'product') {
    super(props);
  }

  async createProduct(nft_identifier, product_name, product_description, metaData_url, coverImage_url, owner_id) {
    const product_id = uuid.v4(); // 生成唯一的 product_id
    return this.insert({ product_id, nft_identifier, product_name, product_description, metaData_url, coverImage_url, owner_id }); // 此处没有插入buyer_id，应该会默认设为NULL，但如果插入出错可以检查这里
  }

  // 通过 product_id 查找唯一的商品
  async findById(product_id) {
    return this.findBy(product_id, 'product_id');
  }
  
  async listByIdArray(params) {
    return this.whereIn('product_id', params.product_id).select();
  }

  async findProductsByIds(productIds) {
    try {
      const products = await knex('product').whereIn('product_id', productIds);
      return products;
    } catch (err) {
      throw err;
    }
  }

  async update(productId, params) {
    return await knex('product').where('product_id', '=', productId).update(params);
  }
}

module.exports = new Product();