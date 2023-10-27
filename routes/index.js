const orderController = require('../controllers/orderController.js');
const productController = require('../controllers/productController.js');
const userController = require('../controllers/userController.js');

// 登录中间件，确保用户已成功登录
const checkLogin = require('../middlewares/checkLogin');

// 存储中间件，暂且仅用于存储文件
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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

router.post('/createProduct', checkLogin, upload.single('uploadFile'), productController.uploadProduct);

// 展示用户全部物品
router.get('/showProduct', checkLogin, productController.listUserProducts);

//创建订单
router.get('/createOrder', orderController.createOrder);

//展示订单
router.get('/showOrder', orderController.showOrder);

//删除订单
router.get('/cancelOrder', orderController.cancelOrder);

//将订单加入购物车
router.get('/pending_paymentOrde', orderController.pending_paymentOrder);

module.exports = router;
