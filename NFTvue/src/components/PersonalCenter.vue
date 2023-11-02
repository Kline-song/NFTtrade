<template>
  <div class="header">
    <Header :input-value="inputValue" @update:input-value="inputValue = $event" @search="searchItems" />
  </div>
<div class="page">
  <div class="headtitle">
    <h1>个人中心</h1>
  </div>
  <div class="body">
    <div class="container">
      <el-menu :default-active="$route.path" class="sidebar" @select="goToPage">
        <el-menu-item v-for="type in types" :key="type.id" :index="type.url">
          <img :src="type.icon" alt="" class="menu-icon" />
          {{ type.name }}
        </el-menu-item>
      </el-menu>
      <div class="content-per">
        <router-view></router-view>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import PersonalInfo from "@/components/PersonalInfo.vue";
import MyCollections from "@/components/MyCollections.vue";
import MyOrders from "@/components/MyOrders.vue";
import MyWallet from "@/components/MyWallet.vue";
import Header from "@/components/Header.vue";

export default {
  data() {
    return {
      types: [
        { id: 1, name: "个人资料", url: "/personalcenter/personalinfo" ,icon:"../public/images/perinfo.png"},
        { id: 2, name: "我的藏品", url: "/personalcenter/mycollections",icon:"../public/images/collect.png" },
        { id: 3, name: "我的订单", url: "/personalcenter/myorders" ,icon:"../public/images/order.png"},
        { id: 4, name: "我的钱包", url: "/personalcenter/mywallet",icon:"../public/images/wallet.png" },
      ],
      inputValue: "",
    };
  },
  methods: {
    goToPage(url) {
      const type = this.types.find((item) => item.url === url);
      if (type) {
        this.$router.push(type.url);
      }
    },
  },
  components: {
    PersonalInfo,
    MyCollections,
    MyOrders,
    MyWallet,
    Header,
  },
};
</script>

<style>
.page{
  margin-top: 70px;
}
.headtitle h1 {
  text-align: left;
  margin-left: 100px;
}

.body {
  margin-left: 100px;
  margin-right: 100px;
}

.container {
  display: flex;
}

.sidebar {
  flex: 1;
  border: 2px solid rgba(177, 25, 26, 1);
  background-color: white;
  border-radius: 20px;
  height: 50%;
}

.content-per {
  flex: 3;
  padding: 20px;
  border: 2px solid rgba(177, 25, 26, 1);
  background-color: white;
  border-radius: 20px;
  height: 350%;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  cursor: pointer;
  padding: 10px;
}

textarea {
  width: 120%;
  height: 100%;
  resize: none;
}
.sidebar .is-active {
  color: rgba(177, 25, 26, 1);
  background-color: #eee;
}
.sidebar .el-menu-item {
  padding: 20px;
  border-radius: 20px;
}
.menu-icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}

</style>
