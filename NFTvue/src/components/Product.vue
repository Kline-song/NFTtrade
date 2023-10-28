<template>
  <div class="header">
    <Header :input-value="inputValue" @update:input-value="inputValue = $event" @search="searchItems" />
  </div>



  <div class="product-details">
    <div class="product-info">
      <div class="product-image">
        <img src="../../public/images/pic1.jpg" alt="Product Image">
      </div>
      <div class="product-summary">
        <h2>{{ product.name }}</h2>
        <div class="product-price">
          <span class="price-label">Price:</span>
          <span class="price-value">{{ product.price }}</span>
        </div>
        <p>{{ product.description }}</p>
        <div>
          <label for="quantity">购买数量:</label>
          <select id="quantity">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div>
          <label for="type">商品类型:</label>
          <select id="type">
            <option value="type1">类型1</option>
            <option value="type2">类型2</option>
            <option value="type3">类型3</option>
          </select>
        </div>
        <div>
          <label for="purchase-method">支付方式:</label>
          <select id="purchase-method">
            <option value="method1">方式1</option>
            <option value="method2">方式2</option>
            <option value="method3">方式3</option>
          </select>
        </div>

        <button class="buy-btn" @click="addToCart">购买</button>

      </div>
    </div>
    <div class="product-description">
      <h3>商品详情</h3>
      <p>{{ product.details }}</p>
    </div>
  </div>


  <footer class="footer">
    版权信息等内容
  </footer>
</template>

<script>
import Header from '@/components/Header.vue';
export default {
  components: {
    Header
  },
  data() {
    return {
      product: {
        name: 'Product Name',
        image: 'path/to/product/image.jpg',
        description: 'Product Description',
        price: '$99.99',
        details: 'Product Details'
      },
      inputValue: '',
    };
  },
  methods: {
    addToCart() {
      // Add logic to add product to cart
    },
    goToPersonalCenter() {
      this.$router.push('/personalcenter');
    }
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
  width:300px;
}

.product-price {
  margin-top: 10px;
}

.buy-btn {
  margin-top: 15px;
  color:white;
  background-color: rgba(177, 25, 26,1);
  border: none;
  width: 75%;
  height:30px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  border-radius: 10px;
}
.buy-btn:hover{
  background-color:rgba(177, 25, 26,0.35) ;
}

.product-description {
  text-align: center;
  background-color: #f2f2f2;
  width:900px;
  height:500px;
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
  box-shadow: 0 0 5px 2px rgba(177, 25, 26,0.6);
}

#quantity option:hover {
  /* 悬浮时的样式 */
  background-color: red;
  color: white;
}

</style>
