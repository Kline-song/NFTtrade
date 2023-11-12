// userController.js
// 引用用户模版数据

const User = require('../models/user.js');
const bcrypt = require('bcryptjs');

const saltRounds = 10;

const userController = {
  // showUser 获取用户数据并返回到页面
  showUser: async function (req, res, next) {
    try {
      let userData = await User.all()
      res.json({
        code: 200,
        message: "操作成功",
        data: userData
      })
    } catch (e) {
      res.json({ code: 0, message: "操作失败", data: e })
    }
  },

  // 用户注册
  registerUser: async function (req, res, next) {
    const { username, password, confirmPassword } = req.body;

    if (!username || !password || !confirmPassword) {
      return res.status(400).json({ code: 400, message: '用户名,密码,确认密码均为为必填项。' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ code: 400, message: '两次输入的密码不一致。' });
    }
    const userData = await User.findByUsername(username);
    if (userData) {
      return res.status(401).json({ code: 401, message: '该用户名已存在' });
    }

    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) {
        console.error('生成盐时出错：' + err.stack);
        return res.status(500).json({ code: 500, message: '无法处理密码。' });
      }

      bcrypt.hash(password, salt, async (err, hashedPassword) => {
        if (err) {
          console.error('密码加密时出错：' + err.stack);
          return res.status(500).json({ code: 500, message: '无法处理密码。' });
        }

        try {
          const userData = await User.createUser(username, hashedPassword);
          res.json({ code: 200, message: '用户注册成功。', data: userData });
        } catch (e) {
          res.json({ code: 500, message: '注册用户时发生错误。', data: e });
        }
      });
    });
  },

  // 用户登录
  loginUser: async function (req, res, next) {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ code: 400, message: '用户名和密码为必填项。' });
    }

    try {
      const userData = await User.findByUsername(username);

      if (!userData) {
        return res.status(401).json({ code: 401, message: '用户名或密码不正确。' });
      }

      const match = bcrypt.compareSync(password, userData.password);
      if (match) {
        // 在登录成功后将 user_id 存储到会话中
        req.session.user_id = userData.user_id;

        res.json({ code: 200, message: '登录成功！', data: userData });
      } else {
        return res.status(401).json({ code: 401, message: '用户名或密码不正确。' });
      }
    } catch (e) {
      res.json({ code: 500, message: '登录时发生错误。', data: e });
    }
  },
  
  //
  showCurrency : async function (req, res, next) {
    const user_id = req.session.user_id;
    try {
      const userData = await User.findById(user_id);
      if (!userData) {
        return res.status(401).json({ code: 401, message: '用户不存在' });
      }
      res.json({ code: 200, data: { currency: userData.currency } });
    } catch (e) {
      res.status(500).json({ code: 500, message: '获取余额失败', data: e });
    }
  },

  // 获取用户余额
  addCurrency: async function (req, res, next) {
    const user_id = req.session.user_id;
    const { currency } = req.body;
    try {
      const userData = await User.findById(user_id);
      if (!userData) {
        return res.status(401).json({ code: 401, message: '用户不存在' });
      }
      const newCurrency = userData.currency + currency;
      const data = await User.update(user_id, { currency: newCurrency });
      res.json({ code: 200, message: '充值成功', data: data });
    } catch (e) {
      res.json({ code: 500, message: '充值失败', data: e });
    }
  },


}

module.exports = userController;