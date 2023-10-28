<template>
  <div class="login-container">
    <div class="login-box">
      <h1>立即登录</h1>
      <div class="input-container">
        <div class="input-wrapper">
          <input type="text" v-model="username" placeholder="请输入账号" />
        </div>
        <div class="input-wrapper">
          <input type="password" v-model="password" placeholder="请输入密码" />
        </div>
      </div>
      <el-button class="button1" type="primary" @click="login">登录</el-button>
      <el-button class="button2" type="text" @click="register">立即注册</el-button>
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
      password: ''
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
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
  background-color: #F4F4F4;
  margin-bottom: 100px;
  margin-top: 100px;
}

.login-box {
  width: 350px;
  height: 250px;
  padding: 20px;
  border: 1px solid black;
  background-color: #fff;
  text-align: center;
  margin-left: 500px;
  height: 250px;
}

.login-box h1 {
  margin-bottom: 50px;
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
  width: 200px;
  /* 修改输入框宽度为100% */
  height: 25px;
  border: 1px solid black;
  /* 修改输入框边框颜色为黑色 */
  border-radius: 10px;
}

.button1 {
  background-color: rgba(177, 25, 26, 1);
  color: white;
  border: none;
}

.button2 {
  margin-left: 10px;
  color: rgba(177, 25, 26, 1);
}
</style>
