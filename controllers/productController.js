// productController

const Product = require('../models/product.js');
const Order = require('../models/order.js');
const pinFileToIPFS = require('../IPFS.js'); // 将文件上传至IPFS
const axios = require('axios'); // 暂时仅用于与rchain接口交互
const configs = require('../config'); // 引用配置文件
const uuid = require('uuid'); // 用于模拟rchain的返回数据

const productController = {
  // 通过nft_identifier, product_name, product_description将存入
  uploadProduct: async function (req, res, next) {
    try {
      if (!req.file) {
        return res.status(400).json({ code: 400, message: '文件未上传' });
      }

      const fileBuffer = req.file.buffer;
      const IpfsHash = await pinFileToIPFS(fileBuffer, req.file.originalname);

      if (!IpfsHash) {
        return res.status(400).json({ code: 400, message: '上传IPFS失败!请重新上传文件' });
      }

      const IpfsGateway = configs.ipfs.gateway;
      const url = IpfsGateway + IpfsHash;

      // 获取当前用户的 user_id
      const owner_id = req.session.user_id;

      // 获取上传的表单数据
      const { product_name, product_description } = req.body;

      const nftData = {
        name: product_name,
        description: product_description,
        Uri: url,
        owner: owner_id
      };
      
      // // 发送请求到rchain，创建NFT
      // const rchainResponse = await axios.post('RCHAIN_NFT_CREATION_ENDPOINT', nftData);
      // 以下为测试代码，仅用于在接口没有写出来之前测试使用
      const rchainResponse = {
        status: 200,
        data: {
          transaction_status: 'success',
          nft_identifier: uuid.v4()
        }
      };      

      // 检查HTTP响应状态
      if (rchainResponse.status !== 200) {
        const errorMsg = rchainResponse.data && rchainResponse.data.error ? rchainResponse.data.error : '未知错误';
        return res.status(400).json({ code: 400, message: '与rchain交互时出错', detail: errorMsg });
      }

      const { transaction_status, nft_identifier } = rchainResponse.data;

      // 检查返回的数据状态
      if (transaction_status !== 'success' || !nft_identifier) {
        const errorMsg = rchainResponse.data && rchainResponse.data.error ? rchainResponse.data.error : '未知错误';
        return res.status(400).json({ code: 400, message: '创建nft_identifier失败', detail: errorMsg });
      }

      const productData = await Product.createProduct(nft_identifier, product_name, product_description, url, owner_id);
      res.json({ code: 200, message: '产品上传成功', data: productData });

    } catch (error) {
      res.status(500).json({ code: 500, message: '上传产品时发生错误', error: error.message });
    }
  },

  // 以下为未实现的函数伪代码

    // 展示全部商品
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