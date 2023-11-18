<template>
  <div class="header">
    <Header :input-value="inputValue" @update:input-value="inputValue = $event" @search="searchItems" />
  </div>


  <div v-for="(product, id) in products" :key="id">

    <div class="product-details">
      <div class="product-info">
        <div class="product-image">
          <img :src="getFullUrl(product.coverImgUrl)" alt="Product image">
        </div>
        <div class="product-summary">
          <h2>{{ product.name }}</h2>
          <div class="product-price">
            <span class="price-label">价格:</span>
            <span class="price-value">{{ product.price }}</span>
          </div>
          <p>简介：{{ product.description }}</p>
          <button class="sellbtn" @click="openSellDialog">购买</button>
        <el-dialog v-model="showModal1" title="填写私钥" @close="showModal1 = false">
              <el-form>
                <el-form-item label="私钥">
                  <el-input v-model="privateKey"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addToCart" class="sellbtn">购买</el-button>
                <el-button @click="showModal1 = false" class="sellbtn">取消</el-button>
              </span>
            </el-dialog>
          <div class="message">{{ message }}</div>
        </div>
      </div>
    </div>
    <div class="product.description">
      <h3>商品详情</h3>
      <div class="iframe-container" v-if="product && product.metadataUrl">
        <iframe :src="product.metadataUrl" ></iframe>
      </div>

    </div>
  </div>


  <footer class="footer">
    版权信息等内容
  </footer>
</template>

<script>
import Header from '@/components/Header.vue';
import axios from 'axios';
export default {
  components: {
    Header
  },
  data() {
    return {
      message: '',
      products: {},
      showModal1:false,
      privateKey:'',
    };
  },
  async created() {
    const productId = this.$route.params.product_id;
    console.log('productId:', productId);
    try {
      const response = await axios.get(`http://localhost:3000/product/${productId}`);
      this.products = response.data;
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    openSellDialog(){

      this.showModal1 = true; // 打开对话框

      this.privateKey = ''; // 初始化私钥
    },
    addToCart() {
      const productId = this.$route.params.product_id;
      console.log('productId:', productId);
      console.log('privateKey:',this.privateKey);
      axios.post(`http://localhost:3000/getTransactionOrder/${productId}`,{privateKey:this.privateKey}, { withCredentials: true })
          .then(response => {
            this.message = response.data.message;
            window.alert('购买成功!');
          })
          .catch(error => {
            console.error(error);
            this.message = 'An error occurred: ' + error;
          });
    },
    goToPersonalCenter() {
      this.$router.push('/personalcenter');
    },
    getFullUrl(relativeUrl) {
      return `http://localhost:3000${relativeUrl}`;
    },
  }

};
</script>

<style>
nav ul {
  display: flex;
  list-style: none;
  gap: 25px;
  height: 3px;
}

nav ul li a {
  text-decoration: none;
  color: black;
}



.footer {
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: lightgray;
  text-align: center;
}


.product-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 70px;
}

.product-info {
  display: flex;
  margin-bottom: 20px;

}

.product-image {
  margin-right: 20px;
  margin-left: 250px;
  width: 33.33%;

}

.product-image img {
  width: 100%;
}

.product-summary {
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 300px;
}

.product-price {
  margin-top: 10px;
}

.buy-btn {
  margin-top: 15px;
  color: white;
  background-color: rgba(177, 25, 26, 1);
  border: none;
  width: 75%;
  height: 30px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  border-radius: 10px;
}

.buy-btn:hover {
  background-color: rgba(177, 25, 26, 0.35);
}

.product-description {
  text-align: center;
  background-color: #f2f2f2;
  width: 900px;
  height: 500px;
}

#quantity {
  /* 添加自定义样式 */
  border: 1px solid #ccc;
  padding: 5px;
  width: 100px;
  transition: box-shadow 0.3s;
}

#quantity:focus {
  /* 点击时的样式 */
  outline: none;
  box-shadow: 0 0 5px 2px rgba(177, 25, 26, 0.6);
}

#quantity option:hover {
  /* 悬浮时的样式 */
  background-color: red;
  color: white;
}

.product-description {
  /* 根据需要设置宽度和高度 */
  width: 100%;
  height: 100%;
}

.iframe-container {
  margin-left:300px;
  position: relative;
  overflow: hidden;
  width: 100%;
  padding-top: 56.25%;
  /* 16:9 Aspect Ratio */

}

.iframe-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  border: none;
}

.message {

}
</style>
