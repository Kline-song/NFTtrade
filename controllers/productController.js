// productController

const Product = require('../models/product.js');
const Order = require('../models/order.js');
const pinFileToIPFS = require('../IPFS.js'); // 将文件上传至IPFS
const configs = require('../config'); // 引用配置文件
const path = require('path'); // 用于处理文件路径
const fs = require('fs'); // 

const nftService = require('../service/nftService')
const uuid = require('uuid');

const productController = {
  // 上传产品 syh
  uploadProduct: async function (req, res, next) {
    // // 测试代码
    // console.log(req.files);  // 打印文件对象
    // console.log(req.body);   // 打印表单数据

    try {
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ code: 400, message: '文件未上传' });
      }

      // 处理NFT元数据文件
      const metaDataFile = req.files.metadata[0];

      // // 测试代码
      // console.log('req.files:', req.files);
      // console.log('req.files.metadata:', req.files.metadata);

      if (!metaDataFile) {
        return res.status(400).json({ code: 400, message: '元数据文件未上传' });
      }
      const metaDataBuffer = metaDataFile.buffer;
      const metaDataIpfsHash = await pinFileToIPFS(metaDataBuffer, metaDataFile.originalname);

      if (!metaDataIpfsHash) {
        return res.status(400).json({ code: 400, message: '上传IPFS失败!请重新上传文件' });
      }

      // 处理封面图片文件
      const coverImageFile = req.files.coverImage[0];
      if (!coverImageFile) {
        return res.status(400).json({ code: 400, message: '封面图片文件未上传' });
      }

      const coverImage_path = path.join(__dirname, '..', 'public', 'covers', coverImageFile.originalname);
      await fs.promises.writeFile(coverImage_path, coverImageFile.buffer);
      const coverImage_url = '/covers/' + coverImageFile.originalname;

      const metaDataIpfsGateway = configs.ipfs.gateway;
      const metaData_url = metaDataIpfsGateway + metaDataIpfsHash;

      // 获取上传的表单数据
      const { product_name, product_description, privateKey } = req.body;
      console.log("privateKey=");
      console.log(privateKey);
      console.log("product_name=");
      console.log(product_name);
      console.log("product_description=");
      console.log(product_description);
      // 生成唯一的 nft_id
      const nft_id = uuid.v4();
      console.log("nft_id=");
      console.log(nft_id);
      console.log("metaData_url=");
      console.log(metaData_url);
      console.log("coverImage_url=");
      console.log(coverImage_url);
      //   const nftData = {
      //     name: product_name,
      //     description: product_description,
      //     uri: metaData_url,
      //     owner: owner_id
      //   };

      // 发送请求到rchain，创建NFT
      // var nft_id = await nftService.mint(product_name, product_description, metaData_url, owner_id);
      // const rchainResponse = {
      //   status: 200,
      //   data: {
      //     transaction_status: 'success',
      //     nft_identifier: "test"
      //   }
      // };

      // // 检查HTTP响应状态
      // if (rchainResponse.status !== 200) {
      //   const errorMsg = rchainResponse.data && rchainResponse.data.error ? rchainResponse.data.error : '未知错误';
      //   return res.status(400).json({ code: 400, message: '与rchain交互时出错', detail: errorMsg });
      // }

      // const { transaction_status, nft_identifier } = rchainResponse.data;

      // // 检查返回的数据状态
      // if (transaction_status !== 'success' || !nft_identifier) {
      //   const errorMsg = rchainResponse.data && rchainResponse.data.error ? rchainResponse.data.error : '未知错误';
      //   return res.status(400).json({ code: 400, message: '创建nft_identifier失败', detail: errorMsg });
      // }
      const productData = await nftService.mint(privateKey, nft_id, product_name, product_description, metaData_url, coverImage_url);

      res.status(200).json({ code: 200, message: '产品上传成功', data: productData });

    } catch (error) {
      console.error(error);  // 这会输出完整的错误堆栈到控制台
      res.status(500).json({ code: 500, message: '上传产品时发生错误', error: error.message });
    }
  },

    //展示待出售的全部商品 syh

  //syh
  listProductsForSale: async function (req, res, next) {
    try {
      const nftsData = await nftService.listNftsForSale();
      //console.log("Response Data:", nftsData);

      // 直接返回映射类型的数据
      res.json(nftsData);

    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },


  //查看单个商品详情 (Get details of a single product)
  getProductDetails: async function (req, res, next) {
    const productId = req.params.id;
    try {
      // 引用修改后的查询商品详情的函数
      const productDetails = await nftService.dataOf_rho('28a5c9ac133b4449ca38e9bdf7cacdce31079ef6b3ac2f0a080af83ecff98b36', productId);

      // 如果没有找到产品，返回 404 状态码
      if (!productDetails) {
        res.status(404).send({ message: 'Product not found' });
        return;
      }

      // 构建映射，以 id 为键，productDetails 为值
      const productMap = { [productId]: productDetails };

      // 返回映射数据
      res.send(productMap);
    } catch (error) {
      // 如果有错误，返回 500 状态码和错误信息
      console.error(error);
      res.status(500).send({ message: 'Server error' });
    }
  },


  // 列出用户的products(List products owned by a user)
  listUserProducts: async function (req, res, next) {

    // const userId = req.session.user_id;
    const { userId } = req.body;
    //console.log(req.body);

    try {
      //引用修改后的查询用户nft的函数:返回的是nft的id
      const productIds = await nftService.listNftByAddr('28a5c9ac133b4449ca38e9bdf7cacdce31079ef6b3ac2f0a080af83ecff98b36', userId);
      //console.log("ids",productIds);
      const products = {};
      for (const id of productIds) {
        // 调用 dataOf_rho 获取数据
        const data = await nftService.dataOf_rho('28a5c9ac133b4449ca38e9bdf7cacdce31079ef6b3ac2f0a080af83ecff98b36', id);
        // 将数据添加到映射中，以id为键
        products[id] = data;
        //console.log("dataaaaaaaaaaaaaaaa:",data);
      }
      console.log("products", products);

      res.status(200).json({ code: 200, data: products });
    } catch (error) {
      res.status(500).json({ code: 500, message: '获取用户产品时发生错误', error: error.message });
    }
  },


    // // 列出用户发布的待售products (List products for sale by a user)
    // listUserSaleNFTs: async function (req, res, next) {
    //   // 涉及到用户id的使用，路由中应该加入登录检查中间件
    //   const userId = req.session.user_id;
    //   try {
    //     // 获取当前用户作为卖家的全部订单
    //     const orders = await Order.listBy({ seller_id: userId });

    //     // 将待售物品id提取出来放入一个数组中
    //     const productIdsForSale = orders.map(o => o.product_id);

    //     // Fetch all products using the extracted product_ids
    //     const productsForSale = await Product.listByIdArray({ product_id: productIdsForSale });

    //     res.status(200).json({ code: 200, data: productsForSale });
    //   } catch (error) {
    //     res.status(500).json({ code: 500, message: '获取用户待售产品时发生错误', error: error.message });
    //   }
    // },
  }

module.exports = productController;

