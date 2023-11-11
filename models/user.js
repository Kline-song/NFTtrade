// user.js

const Base = require('./base');
const uuid = require('uuid');
const knex = require('./knex');

class User extends Base {
  // 定义参数默认值为 user 表
  constructor(props = 'user') {
    super(props);
  }

  async createUser(username, password) {
    const user_id = uuid.v4(); // 生成唯一的 user_id
    const currency = 0; // 设置 currency 的默认值为 0
    return this.insert({ user_id, username, password, currency });
  }

  async findByUsername(username) {
    return this.findBy(username, 'username');
  }

  async findById(user_id) {
    const data = await this.findBy(user_id, 'user_id');
    return data;
  }
  async update(user_id, params) {
    return await knex(this.table).where('user_id', '=', user_id).update(params);
  }
}
module.exports = new User();