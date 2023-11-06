<template>
  <div class="register" :style="{width: fullWidth+'px', height:fullHeight+'px'}">
    <div class="img_box" :style="{width: fullWidth+'px'}"></div>
    </div>
  <div class="login-container">
    <div class="login-box">
      <h1 class="login-now">立即登录</h1>
      <div class="input-container">
        <div class="input-wrapper">
          <input type="text" v-model="username" placeholder="请输入账号" />
        </div>
        <div class="input-wrapper">
          <input type="password" v-model="password" placeholder="请输入密码" @keydown.enter="loginOnEnter" />
        </div>
      </div>
      <div class="buttons">
      <el-button class="button1" type="primary" @click="login">登录</el-button>
      <el-button class="button2" type="text" @click="register">立即注册</el-button>
      </div>
    </div>
  </div>



</template>

<script>
import axios from 'axios';

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      fullWidth: document.documentElement.clientWidth,
      fullHeight: document.documentElement.clientHeight
    };
  },
  methods: {
    async login() {
      const { username, password } = this;
      try {
        const response = await axios.post('http://localhost:3000/login', { username, password }, { withCredentials: true });
        if (response.data.code === 200) {
          // 登录成功，跳转到首页
          this.$router.push('/home');
          this.$message({
            showClose: true,
            message: '登录成功！',
            type: 'success'
          });
        }
      } catch (error) {
        console.error(error);
        this.$message.error(error.response.data.message);
      }
    },
    register() {
      // 跳转到注册页面的逻辑
      this.$router.push('/register');
    },
    handleResize () {
      this.fullWidth = document.documentElement.clientWidth
      this.fullHeight = document.documentElement.clientHeight
    },
    loginOnEnter(event) {
      if (event.key === 'Enter') {
        // 按下回车键后模拟点击登录按钮
        this.login();
      }
    },
  },
  created () {
    window.addEventListener('resize', this.handleResize)
  },
  beforeUnmount () {
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>

<style scoped>
.register {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
}

.img_box {
  position: absolute;
  background-image: url("../../public/images/background1.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  width: 101%;
  height: 101%;
}


.login-box {
  width: 350px;
  height: 250px;
  padding: 20px;
  border: none;
  background-color: rgba(220,220,220,0.55);
  border-radius: 50px;
  text-align: center;
  margin-left: 700px;
  height: 250px;
  margin-top: 180px;
}

.login-box h1 {
  margin-bottom: 30px;
}

.input-container {
  display: flex;
  flex-direction: column;
}

.input-wrapper {
  margin-bottom: 15px;
  margin-left: 0;
}
input[type="text"],
input[type="password"] {
  width: 240px;
  /* 修改输入框宽度为100% */
  height: 27px;
  border:none;
  /* 修改输入框边框颜色为黑色 */
  border-radius: 10px;

}

.button1 {
  background-color: rgba(177, 25, 26, 1);
  color: white;
  border: none;
  width:200px;
  margin-left: 80px;
  border-radius: 20px;
}
.button1:hover{
  background-color: rgba(177, 25, 26, 0.4);
}

.button2 {
  margin-left: 10px;
  color: rgba(177, 25, 26, 1);
}
.login-now{
  color:white;
}
.buttons{
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  margin-top: 10px;
}
</style>
