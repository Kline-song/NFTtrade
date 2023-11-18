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


// // 用户登录
router.post('/login', userController.loginUser);

// // 创建物品
// router.get('/createProduct', function (req, res, next) {
//   res.render('createProduct'); // 'productForm' 是你的jade/pug视图文件的名称
// });


router.post('/createProduct', upload.fields([{ name: 'metadata' }, { name: 'coverImage' }]), productController.uploadProduct);

// // 展示用户全部物品
// router.get('/showProduct',  productController.listUserProducts);

// //展示待出售的全部商品
// router.get('/showProductForSale', productController.listProductsForSale);


//展示单个商品详情

router.get('/product/:id', productController.getProductDetails);

//展示某个用户的全部商品
router.post('/showOwnerProduct',productController.listUserProducts);

// //创建订单
// router.post('/createOrder', checkLogin, orderController.createOrder);

// //展示订单
// router.get('/showOrder', orderController.showOrder);

// //展示全部订单
// router.get('/showAllOrders', orderController.showAllOrders);

// //删除订单
// router.get('/cancelOrder', orderController.cancelOrder);

// //将订单加入购物车
// router.get('/pending_paymentOrde', orderController.pending_paymentOrder);

// //交易订单
// router.get('/getTransactionOrder/:id', orderController.getTransactionOrder);

// // 获取用户余额
// router.get('/showCurrency', checkLogin, userController.showCurrency);

// //充值钱包
// router.post('/addCurrency', checkLogin, userController.addCurrency);

module.exports = router;
