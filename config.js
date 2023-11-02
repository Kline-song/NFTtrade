const configs = {
  mysql: {
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'caixinyi',  // 自己设置的密码
    database: 'nftback' // 数据库的名字
  },
  ipfs: {
    gateway: 'https://scarlet-defensive-swallow-675.mypinata.cloud/ipfs/'
  },
  // 打印错误
  log: {
    error(message) {
      console.log('[knex error]', message)
    }
  }
}

module.exports = configs