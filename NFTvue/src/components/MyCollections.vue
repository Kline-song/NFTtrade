<template>
  <div>
    <h1>我的藏品</h1>
    <div class="sell">
      <button class="sellbtn2" @click="Seller2">上传本地藏品</button>
      <el-dialog v-model="showModal2" title="填写商品信息" @close="showModal2 = false">
        <form @submit.prevent="uploadProduct" enctype='multipart/form-data'>
          <div>
            <label>选择元数据文件：</label>
            <input type='file' ref='metadataFile'>
          </div>
          <div>
            <label>选择封面图片：</label>
            <input type='file' ref='coverImageFile'>
          </div>
          <div>
            <label>商品名称：</label>
            <input type='text' v-model='productName'>
          </div>
          <div>
            <label>商品描述：</label>
            <textarea v-model='productDescription'></textarea>
          </div>
          <div>
            <input type='submit' value='上传'>
          </div>
        </form>
      </el-dialog>
    </div>
    <ul>
      <li v-for="item in collection" :key="item.id">
        <div class="collection-item">
          <img :src="getFullUrl(item.coverImage_url)" alt="藏品照片">
          <div class="collection-info">
            <h3>{{ item.product_name }}</h3>
            <p>ID: {{ item.product_id }}</p>
            <!-- <p>购入价格: {{ item.price }}</p>
            <p>售卖情况: {{ item.status ? '在架' : '不在架' }}</p> -->
            <button class="sellbtn" @click="Seller">售出</button>

            <el-dialog v-model="showModal1" title="填写商品信息" @close="showModal1 = false">
              <el-form>
                <el-form-item label="商品名称">
                  <el-input v-model="productName"></el-input>
                </el-form-item>
                <el-form-item label="价格">
                  <el-input v-model="price"></el-input>
                </el-form-item>
                <el-form-item label="商品简介">
                  <el-input v-model="productDescription"></el-input>
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
      collection: [],
      fileType: null,
      metaData: null,
    };
  },
  created() {
    this.getUserProducts();
  },
  methods: {
    async getUserProducts() {
      try {
        // 此处设置了请求头，携带了 cookie，后续可以考虑将携带 cookie 的设置存储到 main.js 中
        const response = await axios.get('http://localhost:3000/showProduct', { withCredentials: true });
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
    sellProduct() {
      // 执行出售商品的逻辑
      // 可以在这里将商品信息提交给后端
      console.log(this.productName, this.price, this.productDescription);
      // 关闭弹窗
      if (this.showModal1 == true) {
        this.showModal1 = false;
      }
      else if (this.showModal2 == true) {
        this.showModal2 = false;
      }
    },
    async uploadProduct() {
      const metadataFile = this.$refs.metadataFile.files[0];
      const coverImageFile = this.$refs.coverImageFile.files[0];

      if (!metadataFile || !coverImageFile) {
        alert('请确保已选择元数据文件和封面图片！');
        return;
      }

      const formData = new FormData();
      formData.append('metadata', metadataFile);
      formData.append('coverImage', coverImageFile);
      formData.append('product_name', this.productName);
      formData.append('product_description', this.productDescription);

      try {
        const response = await axios.post('http://localhost:3000/createProduct', formData ,{ withCredentials: true });
        if (response.data.code === 200) {
          alert('产品上传成功！');
          this.showModal2 = false;  // 关闭弹窗
        } else {
          alert(`上传失败: ${response.data.message}`);
        }
      } catch (error) {
        console.error('上传产品时发生错误:', error.message);
        alert('上传失败，请稍后再试。');
      }
    },
    getFullUrl(relativeUrl) {
      return `http://localhost:3000${relativeUrl}`;
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
</style>
