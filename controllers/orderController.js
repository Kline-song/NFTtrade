const Order = require('../models/order.js');

const orderController = {
    createOrder: async function (req, res, next) {
        const { username, password } = req.body;
    
        if (!username || !password) {
          return res.status(400).json({ code: 400, message: '用户名和密码为必填项。' });
        }
    
        bcrypt.genSalt(saltRounds, (err, salt) => {
          if (err) {
            console.error('生成延时出错：' + err.stack);
            return res.status(500).json({ code: 500, message: '无法处理密码。' });
          }
    
          bcrypt.hash(password, salt, async (err, hashedPassword) => {
            if (err) {
              console.error('密码加密时出错：' + err.stack);
              return res.status(500).json({ code: 500, message: '无法处理密码。' });
            }
    
            try {
              const userData = await createorder (product_id, seller_id, order_amount);
              res.json({ code: 200, message: '用户注册成功。', data: userData });
            } catch (e) {
              res.json({ code: 500, message: '注册用户时发生错误。', data: e });
            }
          });
        });
      },
}

module.exports = orderController;