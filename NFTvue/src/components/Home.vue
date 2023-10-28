<template>
  <div class="header">
  <Header :input-value="inputValue" @update:input-value="inputValue = $event" @search="searchItems" />
  </div>
  <!-- 此处为页面内容 -->
  <div>


    <div class="content">
      <h2 class="titles">
        <a href="#">全部商品分类  </a>
        <a href="#">为你推荐  </a>
        <a href="#">绘画  </a>
        <a href="#">摄影  </a>
        <a href="#">音乐  </a>
        <a href="#">视频</a>
        <a href="#">游戏物品  </a>
        <a href="#">虚拟地产  </a>
        <a href="#">元宇宙资产</a>
      </h2>
      <hr class="line">
    </div>
    <div class="main-content">
      <div class="page-content">

        <div class="content2">
          <div class="categories">
            <div class="category">
              <a href="#">绘画  </a>
            </div>
            <div class="category">
              <a href="#">摄影  </a>
            </div>
            <div class="category">
              <a href="#">音乐  </a>
            </div>
            <div class="category">
              <a href="#">视频  </a>
            </div>
            <div class="category">
              <a href="#">游戏物品  </a>
            </div>
            <div class="category">
              <a href="#">虚拟地产  </a>
            </div>
            <div class="category">
              <a href="#">元宇宙资产  </a>
            </div>
            <router-link to="/product">（先查看一个商品）</router-link>
          </div>

          <div id="slide">
            <class id="photos">
              <div class="photo">
                <button class="arrow left" @click="previousPhoto">&#8249;</button>
                <img :src="currentPhoto" alt="Photo" style="width: 500px; height: 400px;" class="pictures"/>
                <button class="arrow right" @click="nextPhoto">&#8250;</button>
              </div>
            </class>
          </div>
          <div class="categories">
            <div class="category2">
            <div class="avatar">
              <img src="../../public/images/avatar.png" alt="Avatar">
            </div>
            <div class="user-id">Hi, {{ userId }}</div>
            <div class="button-container">
              <button @click="goToMyCollections">我的藏品</button>
              <button @click="goToMyWallet">我的钱包</button>
              <button @click="goToMyOrder">我的订单</button>
            </div>
          </div>
        </div>
        </div>



        <div class="title2">
          <h1>猜你喜欢</h1>
        </div>

        <div class="content-grid">
          <div v-for="(item, index) in products" :key="index" class="content-box">
            <img :src="item.image" alt="商品图片" class="product-pic"/>
            <p>{{ item.name }}</p>
            <p>{{ item.price }}</p>
          </div>
        </div>


      </div>
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
      userId: "用户1",
      products: [
        { name: "商品名字", price:"价格：1999",image: "../../public/images/pic1.jpg" },
        { name: "商品名字", price:"价格：1999",image: "../../public/images/pic1.jpg" },
        { name: "商品名字", price:"价格：1999",image: "../../public/images/pic1.jpg" },
        { name: "商品名字", price:"价格：1999",image: "../../public/images/pic1.jpg" },
        { name: "商品名字", price:"价格：1999",image: "../../public/images/pic1.jpg" },
        { name: "商品名字", price:"价格：1999",image: "../../public/images/pic1.jpg" },
        { name: "商品名字", price:"价格：1999",image: "../../public/images/pic1.jpg" },
        { name: "商品名字", price:"价格：1999",image: "../../public/images/pic1.jpg" },
        { name: "商品名字", price:"价格：1999",image: "../../public/images/pic1.jpg" },
        { name: "商品名字", price:"价格：1999",image: "../../public/images/pic1.jpg" },
        { name: "商品名字", price:"价格：1999",image: "../../public/images/pic1.jpg" },
        { name: "商品名字", price:"价格：1999",image: "../../public/images/pic1.jpg" },
        // ... 依此类推，添加更多商品数据
      ],
      inputValue: '',
      photos: [
        '../../public/images/pic2.jpg',
        '../../public/images/pic3.jpg',
        '../../public/images/pic1.jpg'
      ],
      currentPhotoIndex: 0
    };
  },
  computed: {
    currentPhoto() {
      return this.photos[this.currentPhotoIndex];
    }
  },
  mounted() {
    // 设置定时器，每隔3秒切换到下一张图片
    setInterval(this.nextPhoto, 3000);
  },
  methods: {
    goToPersonalCenter() {
      this.$router.push('/personalcenter');
    },
    goToMyCollections(){
      this.$router.push('/personalcenter/mycollections');
    },
    goToMyWallet(){
      this.$router.push('/personalcenter/mywallet');
    },
    goToMyOrder(){
      this.$router.push('/personalcenter/myorders');
    },
    previousPhoto() {
      this.currentPhotoIndex =
          this.currentPhotoIndex === 0
              ? this.photos.length - 1
              : this.currentPhotoIndex - 1;
    },
    nextPhoto() {
      this.currentPhotoIndex =
          this.currentPhotoIndex === this.photos.length - 1
              ? 0
              : this.currentPhotoIndex + 1;
    },
    searchItems() {
      // 处理搜索逻辑
    }
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

.content{
  background-color: white;
}
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


.show-logo img{
  width:200px;
}

.page {
  display: flex;
  justify-content: center;
  align-items: center;

}
.titles {
  text-align: center;
  margin-bottom: 0;
}

.titles a {
  text-decoration: none;
  color: black;
  margin-right:25px;
  font-size: 18px;
  margin-bottom: 0;
  font-family: Microsoft Yahei;

}

.titles a:hover {
  color: rgba(177, 25, 26,1) ;
}

.titles a:first-child {
  background-color: rgba(177, 25, 26,1) ;
  color: white;
}
.line {
  margin-top: 0;
  margin-bottom: 0;
  border: none;
  border-top: 1.5px solid#DDDDDD;
}
.main-content{


}
.content2 {
  margin-left: 20px;
  margin-right: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 0px;
}
.page-content{
  margin-left: 130px;
  margin-right: 130px;

}
.category a{
  text-decoration: none;
  color: black;
  margin-right: 10px;
  font-size: 18px;
  font-family: Microsoft Yahei;
  margin-top: 10px;

}
.category{
  margin-bottom: 10px;
}

.category a:hover {
  color: rgba(177, 25, 26,1);
}
.categories{
  width:200px;
  height: 400px;
  margin-left: 0px;
  margin-right: 0;
  margin-top: 20px;
  background-color: #f2f2f2;
  border-radius: 20px;
}

#slide {
  width: 500px; /* 设置容器的宽度 */
  margin-left: 0;
  margin-top: 20px;
}

#photos  img {
  width: 100%; /* 设置图片的宽度为容器的100% */
  height: auto; /* 让高度按比例自动调整 */

}

.content-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
}

.content-box {
  text-align: center;
  height:250px;
  background-color: white;
  border:0.8px solid #eee;
  border-radius:15px;
}


.content-box img {
  margin-top: 10px;
  width: 90%;
  height: 70%;
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
  background-color: rgba(107,107,107,0.55);
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
.button-container button{
  color:white;
  padding: 5px 10px;
  height:30px;
  width:75px;
  background-color:rgba(177, 25, 26,1) ;
  border:none;
  border-radius: 10px;
}

.button-container button:hover{
  background-color:rgba(177, 25, 26,0.35) ;
}
.category2{
  margin-left: 20px;
  margin-right: 20px;
}
.avatar{
margin-top: 20px;
}
.pictures{
  border-radius: 15px;
}
.product-pic{
  border-radius: 15px;
}
</style>
