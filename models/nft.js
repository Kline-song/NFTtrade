// nft.js

const Base = require('./base');

class Nft extends Base {
  // 定义参数默认值为 nft 表
  constructor(props = 'nft') {
    super(props);
  }
  // 显示所有NFT all()

  // 插入NFT save()

  // 根据NFT ID查找指定NFT
  async findById(nft_id) {
    return this.findWhere({ nft_id: nft_id });
  }
  // 根据NFT ID删除指定NFT
  async deleteById(nft_id) {
    return this.deleteWhere({ nft_id: nft_id });
  }
}
module.exports = new Nft();