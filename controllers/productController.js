// productController

const Product = require('../models/product.js');
const Order = require('../models/order.js')

const productController = {
  // 通过nft_identifier, product_name, product_description将存入
  uploadProduct: async function (req, res, next) {
    // 获取当前用户的 user_id
    const owner_id = req.session.user_id;

    // 获取上传的表单数据
    const { nft_identifier, product_name, product_description, url} = req.body;

    // 在这里你可以进行验证输入数据的逻辑，确保数据符合要求
    if (!nft_identifier || !url) {
      return res.status(400).json({ code: 400, message: 'nft_identifier或url不能为空' });
    }
    if (!owner_id || typeof owner_id !== 'string' || owner_id.length !== 36) {
      return res.status(400).json({ code: 400, message: '您尚未登录！请登录后再上传物品' });
    }
    // 创建产品并存储到数据库
    try {
        const productData = await Product.createProduct(nft_identifier, product_name, product_description, url, owner_id);
        res.json({ code: 200, message: '产品上传成功', data: productData });
    } catch (error) {
        res.status(500).json({ code: 500, message: '上传产品时发生错误', error: error.message });
    }
  },

  // 以下为未实现的函数伪代码

    // 展示商品
    showProduct: async function (req, res, next) { 
      try {
        const products = await Product.all();
        res.json({ code: 200, message: '获取成功', data: products });
      } catch (error) {
        res.status(500).json({ code: 500, message: '获取产品时发生错误', error: error.message });
      }
    },

    //查看单个NFT详情 (Get details of a single NFT)
    getNFTDetails: async function (req, res, next) {
      const nftId = req.params.id;
      try {
          const nftDetails = await Product.getNFTDetails(nftId);
          res.json({ code: 200, data: nftDetails });
      } catch (error) {
          // Handle error
      }
    },

    // 列出用户的NFTs(List NFTs owned by a user)
    listUserNFTs: async function (req, res, next) {
      const userId = req.session.user_id;
      try {
          const nfts = await Product.listUserNFTs(userId);
          res.json({ code: 200, data: nfts });
      } catch (error) {
          // Handle error
      }
    },

    // 列出用户发布的待售NFTs (List NFTs for sale by a user)
    listUserSaleNFTs: async function (req, res, next) {
      const userId = req.session.user_id;
      try {
          const nftsForSale = await Product.listUserSaleNFTs(userId);
          res.json({ code: 200, data: nftsForSale });
      } catch (error) {
          // Handle error
      }
    },

    // 查看NFT的交易历史 (View transaction history of an NFT)
    getNFTTransactionHistory: async function (req, res, next) {
      const nftId = req.params.id;
      try {
          const transactionHistory = await Order.getNFTTransactionHistory(nftId);
          res.json({ code: 200, data: transactionHistory });
      } catch (error) {
          // Handle error
      }
    },

    // 搜索NFT (Search for NFTs)
    searchNFTs: async function (req, res, next) {
      const query = req.query.q;
      try {
          const searchResults = await Product.searchNFTs(query);
          res.json({ code: 200, data: searchResults });
      } catch (error) {
          // Handle error
      }
    },
}

module.exports = productController;