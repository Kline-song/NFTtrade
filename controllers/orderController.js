// orderController
const Order = require('../models/order.js');
const User = require('../models/user.js');
const Product = require('../models/product.js');
const orderService = require('../service/orderService.js');
const { priceOf_rho } = require('../contract/nft.js');
const { privateKey } = require('@fabcotech/rchain-toolkit/dist/models/models.mock.js');

const orderController = {
  // 创建一个订单
  createOrder: async function (req, res, next) {
    try {
      const { user_id, product_id, order_amount, privateKey } = req.body;
      console.log('User ID:', user_id);
      console.log('Product ID:', product_id);
      console.log('Order Amount:', order_amount);
      console.log('Private Key:', privateKey);
      // 验证请求参数
      if (!product_id || !order_amount) {
        throw new Error('product_id或order_amount参数缺失');
      }

      const seller_id = user_id;

      const orderList = await orderService.priceOf_rho(privateKey, product_id);
      console.log('Order:', orderList);

      if (orderList != -1) {
        throw new Error('商品正在出售中');
      }


      // 验证seller_id是否存在
      if (!seller_id) {
        throw new Error('seller_id不存在');
      }

      // 创建订单
      const order = await orderService.updateNftPrice_rho(privateKey,product_id,order_amount);
      // 验证创建结果
      if (!order) {
        throw new Error('订单创建失败');
      }

      res.json({ code: 200, message: '订单创建成功', data: order });

    } catch (error) {
      // 错误处理
      if (error.message.includes('缺失') || error.message.includes('类型错误') || error.message.includes('商品正在出售')) {
        res.status(400).json({ code: 400, message: error.message });
      } else {
        res.status(500).json({ code: 500, message: '创建订单时发生错误', error: error.message });
        console.error(error);
      }
    }
  },

  //交易一个订单
  getTransactionOrder: async function (req, res, next) {
    try {
      const productId = req.params.id;
      const { privateKey } = req.body;
      console.log('Product ID:', productId);
      console.log('privateKey:',privateKey);
      //获得商品的拥有者
      const product = await orderService.dataOf_rho(privateKey, productId);
      const sellerId = product.creator;
      console.log('sellerId:',sellerId)
      const amount = product.price;
      // // 从数据库中获取订单数据
      // const order = await Order.findOrdersByProductId(productId);
      // console.log('Order:', order);

      // const userId = req.session.user_id;
      const timestamp = Date.now();
      const orderChange = await orderService.transferNft_rho(privateKey, productId, timestamp);
      const revChange = await orderService.transferRev_rho(privateKey, sellerId, amount);
      // console.log('User ID:', userId);

      // if (!order) {
      //   return res.status(404).json({
      //     code: 404,
      //     message: '订单未找到'
      //   });
      // }

      // // 处理交易过程
      // // 减少买家资产（假设有相关的买家资产字段）
      // const buyer = await User.findById(userId);
      // console.log('Buyer before transaction:', buyer);
      // await User.update(buyer.user_id, { currency: buyer.currency - order[0].order_amount });
      // console.log('Buyer after transaction:', await User.findById(userId));

      // // 增加卖家资产（假设有相关的卖家资产字段）
      // const seller = await User.findById(order[0].seller_id);
      // console.log('Seller before transaction:', seller);
      // await User.update(seller.user_id, { currency: seller.currency + order[0].order_amount });
      // console.log('Seller after transaction:', await User.findById(order[0].seller_id));

      // // 修改商品归属权（假设有相关的商品归属权字段）
      // const product = await Product.findById(order[0].product_id);
      // console.log('Product before transaction:', product);
      // product.owner_id = userId;
      // await Product.update(product.product_id, { owner_id: userId });
      // console.log('Product after transaction:', await Product.findById(order[0].product_id));

      // // 更新订单状态和买家ID
      // await Order.update(order[0].order_id, { order_status: 2, buyer_id: userId });
      // console.log('Order after transaction:', await Order.findById(order[0].order_id));

      // 返回订单信息和处理结果
      if (!orderChange || !revChange) {
        throw new Error('交易失败');
      }

      res.json({ code: 200, message: '交易成功', data: orderChange });

    } catch (error) {
      console.log('Error:', error);
      res.status(500).json({
        code: 500,
        message: '处理交易时发生错误',
        error: error.message
      });
    }
  },

  //展示用户的所有历史订单
  showAllOrders: async function (req, res, next) {
    try {

      //获取用户的地址
      const { userId } = req.body;
      const user_id = userId;
      console.log(user_id);

      // const sellerId = req.body.revAddress;
      // const buyerId = req.body.revAddress;
      // console.log('Seller ID:', sellerId);
      // console.log('Buyer ID:', buyerId);

      const privateKey = "28a5c9ac133b4449ca38e9bdf7cacdce31079ef6b3ac2f0a080af83ecff98b36";
      // 获取订单数据
      const orders = await orderService.listNftLogByAddr_rho(privateKey, user_id);
      

      for (let order of orders) {
        const product = await orderService.dataOf_rho(privateKey, order[0]);
        order[5] = product.metadataUrl;
        order[6] = product.coverImgUrl
      }
      console.log(orders);
      // const sellerOrders = await Order.findOrdersBySellerId(sellerId);
      // const buyerOrders = await Order.findOrdersByBuyerId(buyerId);
      // console.log('Seller Orders:', sellerOrders);
      // console.log('Buyer Orders:', buyerOrders);

      // // 遍历卖家订单，获取并添加产品信息
      // for (let order of sellerOrders) {
      //   const product = await Product.findById(order.product_id);
      //   order.productDescription = product.product_description;
      //   order.productCoverImage_url = product.coverImage_url;
      // }

      // // 遍历买家订单，获取并添加产品信息
      // for (let order of buyerOrders) {
      //   const product = await Product.findById(order.product_id);
      //   order.productDescription = product.product_description;
      //   order.productCoverImage_url = product.coverImage_url;
      // }
      // console.log('Seller Orders:', sellerOrders);
      // console.log('Buyer Orders:', buyerOrders);
      // if (!sellerOrders || !buyerOrders) {
      //   return res.status(404).json({
      //     code: 404,
      //     message: '订单未找到'
      //   });
      // }

      // 返回订单数据给用户
      res.status(200).json({
        code: 200,
        message: '订单获取成功',
        data: {
          orders: orders
        }
      });
    } catch (error) {
      res.status(500).json({
        code: 500,
        message: '获取订单时发生错误',
        error: error.message
      });
    }
  },
}

module.exports = orderController;