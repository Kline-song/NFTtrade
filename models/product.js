const Base = require('./base');
const uuid = require('uuid');

class Product extends Base {
  // 定义参数默认值为 product 表
  constructor(props = 'product') {
    super(props);
  }

  async createProduct(nft_identifier, product_name, product_description, url, owner_id) {
    const product_id = uuid.v4(); // 生成唯一的 product_id
    return this.insert({ product_id, nft_identifier, product_name, product_description, url, owner_id }); // 此处没有插入buyer_id，应该会默认设为NULL，但如果插入出错可以检查这里
  }

  // Get details of a single NFT
  async getNFTDetails(nftId) {
    // Implement DB query to fetch details of a specific NFT using nftId
  }

  // List NFTs owned by a user
  async listUserNFTs(userId) {
    // Implement DB query to list all NFTs owned by a specific user
  }

  // List NFTs for sale by a user
  async listUserSaleNFTs(userId) {
    // Implement DB query to list all NFTs for sale by a specific user
  }

  // Search for NFTs
  async searchNFTs(query) {
    // Implement DB query to search NFTs based on the given query
  }

  async findById(product_id) {
    return this.where({ product_id }).find();
  }
}

module.exports = new Product();