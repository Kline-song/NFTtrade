// middlewares/checkLogin.js
// 检查用户是否已登录，在任何需要使用用户id的地方都应该引入该中间件
module.exports = function checkLogin(req, res, next) {
    const owner_id = req.session.user_id;
    if (!owner_id || typeof owner_id !== 'string' || owner_id.length !== 36) {
      return res.status(400).json({ code: 400, message: '您尚未登录！请登录后再上传物品' });
    }
    next();
};
  