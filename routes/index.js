const orderController = require('../controllers/orderController.js');
const productController = require('../controllers/productController.js');
const userController = require('../controllers/userController.js');

var express = require('express');
var router = express.Router();
// index.js

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


// 获取用户信息
router.get('/get_user', userController.showUser);

// 注册新用户
router.post('/register', userController.registerUser);

// 用户登录
router.post('/login', userController.loginUser);

// 创建物品
router.get('/createProduct', function (req, res, next) {
  res.render('createProduct'); // 'productForm' 是你的jade/pug视图文件的名称
});

router.post('/createProduct', productController.uploadProduct);

//创建订单
router.get('/createOrder', orderController.createOrder);

//展示订单
router.get('/showOrder', orderController.showOrder);

//删除订单
router.get('/cancelOrder', orderController.cancelOrder);

//将订单加入购物车
router.get('/pending_paymentOrde', orderController.pending_paymentOrder);

module.exports = router;
