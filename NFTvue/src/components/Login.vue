<template>
  <div class="register" :style="{width: fullWidth+'px', height:fullHeight+'px'}">
    <div class="img_box" :style="{width: fullWidth+'px'}"></div>
  </div>
  <div class="login-container">
    <div class="login-box">
      <h1 class="login-now">立即登录</h1>
      <div class="input-container">
        <div class="input-wrapper">
          <input type="text" v-model="address" placeholder="请输入地址码" />
        </div>
      </div>
      <div class="buttons">
        <el-button class="button1" type="primary" @click="login">登录</el-button>
        <el-button class="button2" type="text" @click="register">获取账户</el-button>
      </div>
    </div>
  </div>



</template>

<script>
import axios from 'axios';
import {verifyRevAddr} from '@tgrospic/rnode-grpc-js';
export default {
  name: 'Login',
  data() {
    return {
      address: '',
      fullWidth: document.documentElement.clientWidth,
      fullHeight: document.documentElement.clientHeight,
    };
  },
  methods: {
    isValidRevAddress(address) {
      try {
        // 使用 verifyRevAddr 方法验证 REV 地址的有效性
        return verifyRevAddr(address);
      } catch (error) {
        return false; // 验证错误或其他问题
      }
    },
    async login() {
      // 验证 REV 地址的有效性
      if (this.isValidRevAddress(this.address)) {

        //TODO:保存地址到 sessionStorage
        sessionStorage.setItem('revAddress', this.address);

        //TODO:发送地址给后端（替换为你的后端端点的实际 URL）
        try {
          const response = await axios.post('http://localhost:3000/login', { revAddress: this.address }, { withCredentials: true });
          if (response.data.code === 200) {
            // 登录成功，跳转到首页
            this.$router.push('/home');
            this.$message({
              showClose: true,
              message: '登录成功！',
              type: 'success',
            });
          }
        } catch (error) {
          console.error('与后端通信时出错:', error);
          this.$message.error('登录失败，请重试。');
        }
      } else {
        alert('无效的 REV 地址。请输入有效的 REV 地址。');
      }
    },

    register() {
      // 跳转到注册页面的逻辑
      this.$router.push('/register');
    },
    handleResize() {
      this.fullWidth = document.documentElement.clientWidth;
      this.fullHeight = document.documentElement.clientHeight;
    },
    loginOnEnter(event) {
      if (event.key === 'Enter') {
        // 按下回车键后模拟点击登录按钮
        this.login();
      }
    },
  },
  created() {
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
  },
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
  color:rgba(177, 25, 26, 1);
}
.buttons{
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  margin-top: 10px;
}
</style>
