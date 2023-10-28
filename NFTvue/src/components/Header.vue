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
          <button class="perbtn" @click="goToPersonalCenter">个人中心</button>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
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
    }
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
  position:sticky;
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

/*上面是版头的css*/

</style>