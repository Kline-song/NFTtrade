<template>
  <div class="register" :style="{width: fullWidth+'px', height:fullHeight+'px'}">
    <div class="img_box" :style="{width: fullWidth+'px'}"></div>
  </div>
  <div class="register1">
    <div class="content">
    <h1 class="login-title">注册</h1>
    <form @submit.prevent="register" class="content2">
      <div class="form-group">

        <input type="text" id="username" v-model="username" required />
        <label for="username" class="input">用户名</label>
      </div>
      <div class="form-group">

        <input type="password" id="password" v-model="password"  required />
        <label for="password" class="input" >密码</label>
      </div>
      <div class="form-group">

        <input type="password" id="confirmPassword" v-model="confirmPassword" required />
        <label for="confirm"   class="input">确认密码</label>
      </div>
      <button type="submit">注     册</button>
    </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Register',
  data() {
    return {
      username: '',
      password: '',
      fullWidth: document.documentElement.clientWidth,
      fullHeight: document.documentElement.clientHeight
    };
  },
  methods: {
    async register() {
      const { username, password, confirmPassword } = this;
      try {
        const response = await axios.post('http://localhost:3000/register', { username, password, confirmPassword }, { withCredentials: true });
        if (response.data.code === 200) {
          // 注册成功，跳转到登录页面
          this.$router.push('/');
          this.$message({
            showClose: true,
            message: '注册成功！',
            type: 'success'
          });
        }
      } catch (error) {
        console.error(error);
        this.$message.error(error.response.data.message);
      }
    },
    handleResize () {
      this.fullWidth = document.documentElement.clientWidth
      this.fullHeight = document.documentElement.clientHeight
    }
  }
};
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
  background-image: url("../../public/images/background-login.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  width: 101%;
  height: 101%;
}
.register1 {
  margin-left: 420px;
  width:400px;
  background-color: rgba(238,238,238,0.8);
  border:none;
  border-radius: 20px;
  height:400px;
}

h2 {
  text-align: center;
}

.form-group {
  margin-bottom: 30px;

}

label {
  display: block;
  font-weight: bold;
}

input[type="text"],
input[type="email"],
input[type="tel"],
input[type="password"] {
  width: 200px;
  height:10px;
  padding: 10px;
  font-size: 16px;
  border-radius: 10px;
  border:none;
  float:right;
  margin-right: 30px;
  margin-left:0px;
}

button {
  width: 150px;
  height:35px;
  padding: 10px;
  font-size: 16px;
  background-color: rgba(177, 25, 26, 1);
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  margin-left: 110px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 35px;
}
button:hover{
  background-color: rgba(177, 25, 26, 0.6);
}
.content{
  margin-top: 150px;
  padding:20px;
}
.input{
  margin-right:0px;
}
</style>
