<template>
  <div>
    <h1>我的藏品</h1>
    <div class="sell">
      <button class="sellbtn2" @click="Seller2">上传本地藏品</button>
      <el-dialog v-model="showModal2" title="填写商品信息" @close="showModal2 = false">
        <form @submit.prevent="uploadProduct" enctype='multipart/form-data'>
          <div class="product-input">
            <label>选择元数据文件：</label>
            <input type='file' ref='metadataFile' class="choose">
          </div>
          <div class="product-input">
            <label>选择封面图片：</label>
            <input type='file' ref='coverImageFile' class="choose">
          </div>
          <div class="product-input">
            <label>商品名称：</label>
            <input type='text' v-model='productName' class="inputlabel">
          </div>
          <div class="product-input">
            <label>商品描述：</label>
            <textarea v-model='productDescription' class="inputlabel2"></textarea>
          </div>
          <div class="product-input">
            <label>私钥：</label>
            <input type='text' v-model='privateKey' class="inputlabel">
          </div>
          <div>
            <input type="submit" value="上传" class="btn" :disabled="isUploading" @click="handleUploadClick">
            <div v-if="isUploading" class="loading-indicator">
              <!-- Add a loading spinner or message here -->
              <i class="fas fa-spinner fa-spin"></i> 上传中...
            </div>
          </div>
        </form>
      </el-dialog>
    </div>
    <ul>
      <li v-for="(item, id) in collection" :key="id">
        <div class="collection-item">
          <img :src="getFullUrl(item.coverImgUrl)" alt="藏品照片">
          <div class="collection-info">
            <h3>{{ item.name }}</h3>
            <p>ID: {{ id }}</p>
            <button class="sellbtn" @click="openSellDialog(id)">售出</button>
            <el-dialog v-model="showModal1" title="填写商品信息" @close="showModal1 = false">
              <el-form>
                <el-form-item label="价格">
                  <el-input v-model="price"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="sellProduct" class="sellbtn">出售</el-button>
                <el-button @click="showModal1 = false" class="sellbtn">取消</el-button>
              </span>
            </el-dialog>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'MyCollections',
  data() {
    return {
      coverImage: '',
      showModal2: false,
      showModal1: false,
      productName: '',
      price: '',
      productDescription: '',
      image: null,// 上传的图片
      collection: {},
      fileType: null,
      metaData: null,
      isUploading: false, // 添加 isUploading 数据属性用于跟踪上传状态
      privateKey: '',
    };
  },
  created() {
    this.getUserProducts();
  },
  methods: {

    openSellDialog(productId) {
      this.productIdToSell = productId; // 保存商品ID
      this.showModal1 = true; // 打开对话框
    },
    async getUserProducts() {
      try {
        // 此处设置了请求头，携带了 cookie，后续可以考虑将携带 cookie 的设置存储到 main.js 中
        var userId = sessionStorage.getItem("revAddress");
        const response = await axios.post('http://localhost:3000/showOwnerProduct', {userId}, { withCredentials: true });
        if (response.data.code === 200) {
          this.collection = response.data.data;
        } else {
          console.error('Error getting user products:', response.data.message);
        }
      } catch (error) {
        console.error('Error getting user products:', error.message);
      }
    },
    // seller和sellProduct作为出售商品的逻辑，与数据库的设计存在出入，需要后续做订单的时候进行修改
    Seller() {
      this.showModal1 = true;
    },
    Seller2() {
      this.showModal2 = true;
      this.coverImage = null;
      this.fileType = null;
      this.metaData = null;
    },
    async sellProduct() {
      try {
        const response = await axios.post('http://localhost:3000/createOrder', {
          product_id: this.productIdToSell,
          order_amount: this.price
        }, { withCredentials: true });

        if (response.data.code === 200) {
          alert('订单创建成功！');
          this.showModal1 = false;  // 关闭弹窗
          // 上传成功后刷新页面
          window.location.reload();
        } else if (response.data.error) {
          alert(`创建订单失败: ${response.data.error}`);
        } else {
          alert(`创建订单失败: ${response.data.message}`);
        }
      } catch (error) {
        console.error('创建订单时发生错误:', error.message);
        alert('创建订单失败，请稍后再试。(注：同一产品不可上传多次订单)');
      }
    },
    async uploadProduct() {
      const metadataFile = this.$refs.metadataFile.files[0];
      const coverImageFile = this.$refs.coverImageFile.files[0];

      if (!metadataFile || !coverImageFile) {
        alert('请确保已选择元数据文件和封面图片！');
        return;
      }

      this.isUploading = true; // 开始上传时禁用提交按钮
      const formData = new FormData();
      formData.append('metadata', metadataFile);
      formData.append('coverImage', coverImageFile);
      formData.append('product_name', this.productName);
      formData.append('product_description', this.productDescription);
      formData.append('privateKey', this.privateKey);

      try {
        const response = await axios.post('http://localhost:3000/createProduct', formData, { withCredentials: true });

        // Check for success or failure
        if (response.data.code === 200) {
          // Handle success
          alert('产品上传成功！');
          this.showModal2 = false;
          // 上传成功后刷新页面
          window.location.reload();
        } else {
          // Handle failure
          alert(`上传失败: ${response.data.message}`);
        }
      } catch (error) {
        // Handle error
        console.error('上传产品时发生错误:', error.message);
        alert('上传失败，请稍后再试。');
      } finally {
        // Reset isUploading after the upload completes (success, failure, or error)
        this.isUploading = false;
      }
    },

    getFullUrl(relativeUrl) {
      return `http://localhost:3000${relativeUrl}`;
    },
    handleUploadClick() {
      if (this.isUploading) {
        alert("有一个上传进程正在进行");
      }
    },
  },
};
</script>

<style scoped>
.collection-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.collection-item img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 10px;
}

.collection-info h3 {
  margin-top: 0;
}

.collection-info p {
  margin: 5px 0;
}

.sellbtn {
  color: white;
  padding: 5px 10px;
  height: 30px;
  width: 75px;
  background-color: rgba(177, 25, 26, 1);
  border: none;
  border-radius: 10px;
}

.sellbtn2 {
  color: white;
  padding: 5px 10px;
  height: 30px;
  width: 150px;
  background-color: rgba(177, 25, 26, 1);
  border: none;
  border-radius: 10px;
}

.cover-image {
  width: 200px;
  height: 200px;
}

.inputlabel {
  margin-top: 20px;
  border-radius: 10px;
  width: 150px;
}

.inputlabel2 {
  margin-top: 20px;
  border-radius: 10px;
  width: 300px;
  height: 20px;
}

.btn {
  color: white;
  padding: 5px 10px;
  height: 30px;
  width: 150px;
  background-color: rgba(177, 25, 26, 1);
  border: none;
  border-radius: 10px;
}

.btn:hover {
  background-color: rgba(177, 25, 26, 0.4);
}

.btn:active {
  background-color: rgba(177, 25, 26, 0.4);
}

label {
  text-align: left;
}

.choose {
  margin-top: 5px;
  margin-bottom: 10px;
}

.product-input {
  text-align: left;
  margin-left: 120px;
  margin-bottom: 10px;
}
.loading-indicator {
  margin-top: 10px;
  font-size: 20px;
}
</style>
