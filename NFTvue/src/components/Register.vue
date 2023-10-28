<template>
  <div class="register">
    <h2>注册</h2>
    <form @submit.prevent="register">
      <div class="form-group">
        <label for="username">用户名</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div class="form-group">
        <label for="password">密码</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <div class="form-group">
        <label for="confirm">确认密码</label>
        <input type="password" id="confirmPassword" v-model="confirmPassword" required />
      </div>
      <button type="submit">注册</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Register',
  data() {
    return {
      username: '',
      password: ''
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
    }
  }
};
</script>

<style scoped>
.register {
  max-width: 400px;
  margin: 0 auto;
}

h2 {
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: bold;
}

input[type="text"],
input[type="email"],
input[type="tel"],
input[type="password"] {
  width: 400px;
  padding: 10px;
  font-size: 16px;
  border-radius: 10px;
}

button {
  display: block;
  width: 400px;
  padding: 10px;
  font-size: 16px;
  background-color: rgba(177, 25, 26, 1);
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 10px;

}
</style>
