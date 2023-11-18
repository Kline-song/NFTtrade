<template>
  <div class="header">
    <Header :input-value="inputValue" @update:input-value="inputValue = $event" @search="searchItems" />
  </div>
  <!-- 此处为页面内容 -->
  <div>



    <div class="main-content">
      <div class="page-content">

        <div class="title2">
          <h1>全部商品</h1>
        </div>

        <div class="content-grid">
          <div v-for="product in products" :key="product.product_id" class="content-box"
            @click="goToProduct(product.product_id, product.order_amount)">
            <img :src="getFullUrl(product.coverImage_url)" alt="商品图片" class="product-pic" />
            <p>{{ product.product_name }}</p>
            <p>{{ product.product_description }}</p>
            <p>{{ product.order_amount }}</p>
          </div>
        </div>


      </div>
    </div>

  </div>

  <footer class="footer">
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
      userId: "用户1",
      products: [],
      timerId: null,
      inputValue: '',
      photos: [
        '../../public/images/pic2.jpg',
        '../../public/images/pic3.jpg',
        '../../public/images/pic1.jpg'
      ],
      currentPhotoIndex: 0
    };
  },
  // 在页面加载时获取待出售商品信息到猜你喜欢中
  // async created() {
  //   this.fetchProducts();

  //   // Fetch products every 5 seconds
  //   this.timerId = setInterval(this.fetchProducts, 5000);
  // },
  computed: {

  },

  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get('http://localhost:3000/showProductForSale');
        this.products = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    goToPersonalCenter() {
      this.$router.push('/personalcenter');
    },
    goToMyCollections() {
      this.$router.push('/personalcenter/mycollections');
    },
    goToMyWallet() {
      this.$router.push('/personalcenter/mywallet');
    },
    goToMyOrder() {
      this.$router.push('/personalcenter/myorders');
    },
    goToProduct(product_id, order_amount) {
      this.$router.push({
        name: 'Product',
        params: {
          product_id: product_id,
          order_amount: order_amount
        }
      });
    },

    searchItems() {
      // 处理搜索逻辑
    },
    getFullUrl(relativeUrl) {
      return `http://localhost:3000${relativeUrl}`;
    },
  }
};


</script>

<style scoped>
.footer {
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: lightgray;
  text-align: center;
}


.show-logo img {
  width: 200px;
}


.titles a {
  text-decoration: none;
  color: black;
  margin-right: 25px;
  font-size: 18px;
  margin-bottom: 0;
  font-family: Microsoft Yahei;

}

.titles a:hover {
  color: rgba(177, 25, 26, 1);
}

.titles a:first-child {
  background-color: rgba(177, 25, 26, 1);
  color: white;
}

.line {
  margin-top: 0;
  margin-bottom: 0;
  border: none;
  border-top: 1.5px solid rgba(189,189,189,0.9);
}

.main-content {
  margin-top: 70px;
}

.content2 {
  margin-left: 20px;
  margin-right: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 0px;
}

.page-content {
  margin-left: 160px;
  margin-right: 130px;


}

.category a {
  text-decoration: none;
  color: black;
  margin-right: 10px;
  font-size: 18px;
  font-family: Microsoft Yahei;
  margin-top: 10px;

}

.category {
  margin-bottom: 10px;
}

.category a:hover {
  color: rgba(177, 25, 26, 1);
}


#slide {
  width: 500px;
  /* 设置容器的宽度 */
  margin-left: 0;
  margin-top: 20px;
}

#photos img {
  width: 100%;
  /* 设置图片的宽度为容器的100% */
  height: auto;
  /* 让高度按比例自动调整 */

}

.content-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  margin-bottom: 50px;
  margin-top: 30px;
}

.content-box {
  text-align: center;
  height: 245px;
  width: 190px;
  background-color: white;
  border: 0.8px solid rgba(189,189,189,0.8);
  border-radius: 15px;
}


.content-box img {
  margin-top: 10px;
  width: 82%;
  height: 61%;
}

.content-box p {
  margin-top: 5px;
  margin-bottom: 5px;
}

.photo {
  text-align: center;
  position: relative;
}


.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 40px;
  background-color: rgba(107, 107, 107, 0.55);
  border: none;
  font-size: 24px;
  color: white;
  cursor: pointer;
}

.left {
  left: 10px;
}

.right {
  right: 10px;
}

.avatar img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.user-id {
  margin-top: 10px;
}

.button-container {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  margin-left: 40px;

}

.button-container button {
  margin-bottom: 10px;
}

.button-container button {
  color: white;
  padding: 5px 10px;
  height: 30px;
  width: 75px;
  background-color: rgba(177, 25, 26, 1);
  border: none;
  border-radius: 10px;
}

.button-container button:hover {
  background-color: rgba(177, 25, 26, 0.35);
}

.category2 {
  margin-left: 20px;
  margin-right: 20px;
}

.avatar {
  margin-top: 20px;
}

.pictures {
  border-radius: 15px;
}

.product-pic {
  border-radius: 15px;
}
h1{
  text-align: left;
}
</style>
