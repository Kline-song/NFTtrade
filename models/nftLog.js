// nftLog.js

const Base = require('./base');
const knex = require('../models/knex');

class NftLog extends Base {
  // 定义参数默认值为 nft_log 表
  constructor(props = 'nft_log') {
    super(props);
  }

  async listByOwnerId(owner_id) {
    // SELECT * FROM nft_log WHERE from_id = ? OR to_id = ?
    try {
        const nftLogs = await knex('nft_log').where({ from_id: owner_id }).orWhere({ to_id: owner_id });
        return nftLogs;
    } catch (err) {
        throw err;
    }
  }

  async listByFromId(from_id) {
    return this.listBy({from_id: from_id});
  }

  async listByToId(to_id) {
    return this.listBy({to_id: to_id});
  }

  async listByNftId(nft_id) {
    return this.listBy({nft_id: nft_id});
  }
}
module.exports = new NftLog();