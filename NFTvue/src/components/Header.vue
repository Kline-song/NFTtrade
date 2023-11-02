<template>
  <header class="header">
    <nav>
      <div class="nav-list">
        <router-link to="/home" class="show-logo">
          <img src="../../public/images/logo.jpg" alt="数字藏品平台">
        </router-link>
        <div class="input-container">
          <input type="text" :value="value" @input="updateValue" placeholder="请输入内容" />
          <button @click="handleSearch">搜索</button>
        </div>
        <div class="person">
          <div class="dropdown">
            <button class="perbtn" @mouseover="showDropdown" @mouseleave="hideDropdown" @click="goToPersonalCenter">个人中心</button>
            <div class="dropdown-content" v-show="showMenu" @mouseover="showDropdown" @mouseleave="hideDropdown">
              <button class="dropdown-item" @click="goToPersonalInfo">个人资料</button>
              <button class="dropdown-item" @click="goToMyCollections">我的藏品</button>
              <button class="dropdown-item" @click="goToMyOrder">我的订单</button>
              <button class="dropdown-item" @click="goToMyWallet">我的钱包</button>
            </div>
          </div>
        </div>
        <img class="collections" @click="goToMyCollections" src="../../public/images/collections.png" title="我的藏品">
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  data(){
    return{
      showMenu: false
    }
  },
  props: {
    value: {
      type: String,
      required: true
    }
  },
  methods: {
    updateValue(event) {
      this.$emit('update:value', event.target.value);
    },
    handleSearch() {
      this.$emit('search');
    },
    goToPersonalCenter() {
      this.$router.push('/personalcenter/personalinfo');
    },
    goToPersonalInfo(){
      this.$router.push('/personalcenter/personalinfo');
    },
    goToMyCollections(){
      this.$router.push('/personalcenter/mycollections');
    },
    goToMyOrder(){
      this.$router.push('/personalcenter/myorders');
    },
    goToMyWallet(){
      this.$router.push('/personalcenter/mywallet');
    },
    showDropdown() {
      this.showMenu = true;
    },
    hideDropdown() {
      setTimeout(() => {
        this.showMenu = false;
      }, 5000) // 留出一点时间，确保鼠标能够移动到下拉框上
    },
  }
}
</script>

<style scoped>
.header {
  margin-top: 0px;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9999;
  height:50px;
  margin-bottom: 20px;
  background-color: white;
  position:fixed;
}

.nav-list {
  display: flex;
  justify-content: center;

}

.footer {
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: lightgray;
  text-align: center;
}

.person{
  margin-left: 40px;
  text-decoration: none;
  color: black;
  margin-right:25px;
  font-size: 18px;
  margin-top:5px;
  font-family: Microsoft Yahei;

}
.perbtn{
  color:white;
  padding: 5px 10px;
  height:30px;
  width:75px;
  background-color:rgba(177, 25, 26,1) ;
  border:none;
  border-radius: 10px;
}

.perbtn:hover{
  background-color:rgba(177, 25, 26,0.35) ;
}
.input-container {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  justify-content: center;
  align-items: center;
  height:45px;

}
.show-logo img{
  width:200px;
  margin-right: 50px;
}


.input-container input {
  margin-right: 1px;
  height:25px;
  width:350px;
  border: 1.5px solid rgba(177, 25, 26,1);
}
input[type="text"] {
  width: 375px; /* 修改输入框宽度为100% */
  border-radius: 10px;
}
.additional-info button{
  width:80px;
}


.additional-info span {
  margin-right: 10px;
}

.input-container button {
  color:white;
  padding: 5px 10px;
  height:30px;
  width:75px;
  background-color:rgba(177, 25, 26,1) ;
  border:none;
  border-radius: 10px;
}
.input-container button:hover{
  background-color:rgba(177, 25, 26,0.35) ;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  z-index: 1;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown-item{
  color:rgba(177, 25, 26,1) ;
  padding: 5px 10px;
  height:30px;
  width:75px;
  border:none;
}
.collections{
  width:35px;
  height:35px;
}
.collections:hover{
  border:0.5px solid gainsboro;
  border-radius: 20px;
}
/*上面是版头的css*/

</style>