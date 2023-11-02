// base.js

const knex = require('../models/knex');

class Base {
  constructor(props) {
    this.table = props;
  }

  // 查找
  async all() {
    return await knex(this.table).select();
  }

  // 新增
  async insert(params) {
    return await knex(this.table).insert(params);
  }

  // 更改
  async update(id, params) {
    return await knex(this.table).where('id', '=', id).update(params);
  }

  // 删除
  async delete(id) {
    return await knex(this.table).where('id', '=', id).del();
  }

  async save(data) {
    try {
      return await knex(this.table).insert(data);
    } catch (error) {
      console.error('Error saving data:', error);
      throw error;
    }
  }

  // 返回查询到的第一个元素
  async findBy(id, idName) {
    return await knex(this.table).where(idName, '=', id).first();
  }

  // 返回查询到的所有元素，给参数的方式为(id: 5, name: 'John')
  async listBy(params) {
    return await knex(this.table).where(params).select();
  }
}

module.exports = Base;
