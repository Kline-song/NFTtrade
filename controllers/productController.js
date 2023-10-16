const Product = require('../models/product.js');

const productController = {
  // 通过nft_identifier, product_name, product_description将存入
  uploadProduct: async function (req, res, next) {
    // 获取当前用户的 user_id
    const owner_id = req.session.user_id;

    // 获取上传的表单数据
    const { nft_identifier, product_name, product_description } = req.body;
    
    // 处理文件上传（如果有文件上传的需求）
    if (req.file) {
        const file = req.file; // 从 req.file 中获取上传的文件
        // 处理文件存储逻辑
    }

    // 在这里你可以进行验证输入数据的逻辑，确保数据符合要求

    // 创建产品并存储到数据库
    try {
        const productData = await Product.createProduct(nft_identifier, product_name, product_description, url, owner_id);
        res.json({ code: 200, message: '产品上传成功', data: productData });
    } catch (error) {
        res.status(500).json({ code: 500, message: '上传产品时发生错误', error: error.message });
    }
  },

  showProduct: async function (req, res, next) { 

  },
}

module.exports = productController;