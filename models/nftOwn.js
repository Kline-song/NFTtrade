// nftOwn.js

const Base = require('./base');

class NftOwn extends Base {
  // 定义参数默认值为 nft_own 表
  constructor(props = 'nft_own') {
    super(props);
  }

  async listByOwnerId(owner_id) {
    return this.listBy({owner_id: owner_id});
  }

  async listByNftId(nft_id) {
    return this.listBy({nft_id: nft_id});
  }

  async findByNftIdAndOwnerId(nft_id, owner_id) {
    // SELECT * FROM nft_own WHERE nft_id = ? AND owner_id = ?
    return this.findWhere({nft_id: nft_id, owner_id: owner_id});
  }

  // save()
  
  async deleteByNftIdAndOwnerId(nft_id, owner_id) {
    return this.deleteWhere({nft_id: nft_id, owner_id: owner_id});
  }
  
  async updateOwnerIdByNftIdAndOwnerId(nft_id, owner_id, new_owner_id) {
    // UPDATE nft_own SET owner_id = ? WHERE nft_id = ? AND owner_id = ?
    return this.updateWhere({nft_id: nft_id, owner_id: owner_id}, {owner_id: new_owner_id});
  }
}
module.exports = new NftOwn();