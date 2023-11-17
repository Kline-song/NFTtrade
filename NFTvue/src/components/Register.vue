<template>
  <div class="register" :style="{width: fullWidth+'px', height:fullHeight+'px'}">
    <div class="img_box" :style="{width: fullWidth+'px'}"></div>
  </div>
  <div class="register1">
    <div class="content">
      <h2>获取账户</h2>
      <div id="app">
        <!-- Input and Button Row -->
        <div>
          <input v-model="privateKey" placeholder="REV address/ETH address/Public key/Private key">
          <button @click="generateAccount">New Account</button>
        </div>

        <!-- Textbox Rows (Initially Hidden) -->
        <div v-if="accountGenerated">
          <div class="info-row">
            <div>Private Key:</div>
            <input class="info-input" v-model="privateKey" readonly>
            <button class="copy-button" @click="copyToClipboard('privateKey')">复制</button>
          </div>
          <div class="info-row">
            <div>Public Key:</div>
            <input class="info-input" v-model="publicKey" readonly>
            <button class="copy-button" @click="copyToClipboard('publicKey')">复制</button>
          </div>
          <div class="info-row">
            <div>ETH:</div>
            <input class="info-input" v-model="eth" readonly>
            <button class="copy-button" @click="copyToClipboard('eth')">复制</button>
          </div>
          <div class="info-row">
            <div>REV:</div>
            <input class="info-input" v-model="rev" readonly>
            <button class="copy-button" @click="copyToClipboard('rev')">复制</button>
          </div>
      </div>
      </div>
    </div>
    <div class="content1">
      <p>提示:在第一次登录本网站的时，点击获取一个账户。请用户自行保存好账户的相关信息，并使用REV地址登录。当用户遗忘REV地址时，可以使用私钥在上方输入框查询公钥与地址信息。</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import {
  getAddrFromPrivateKey,
  newRevAddress,
} from '@tgrospic/rnode-grpc-js';
export default {
  name: 'Register',
  data() {
    return {
      username: '',
      password: '',
      fullWidth: document.documentElement.clientWidth,
      fullHeight: document.documentElement.clientHeight,

      publicKey: '',
      privateKey: '',
      eth: '',
      rev: '',
      publicKeyResult: '',
      privateKeyResult: '',
      ethResult: '',
      revResult: '',
      accountGenerated: false,
    };
  },
  methods: {
    handleResize () {
      this.fullWidth = document.documentElement.clientWidth
      this.fullHeight = document.documentElement.clientHeight
    },
    //get account
    async generateAccount() {
      try {
        if (this.privateKey) {
          // If privateKey is provided, get addresses from it
          const { pubKey, ethAddr, revAddr } = await getAddrFromPrivateKey(this.privateKey);

          // Update the state or variables with the obtained values
          this.publicKey = pubKey;
          this.eth = ethAddr;
          this.rev = revAddr;


        } else {
          // Generate a new REV address
          const { privKey, pubKey, ethAddr, revAddr } = await newRevAddress();

          // Update the state or variables with the generated values
          this.publicKey = pubKey;
          this.privateKey = privKey;
          this.eth = ethAddr;
          this.rev = revAddr;
        }

        // Update textboxes or any other UI elements
        this.publicKeyResult = `Public Key: ${this.publicKey}`;
        this.privateKeyResult = `Private Key: ${this.privateKey}`;
        this.ethResult = `ETH: ${this.eth}`;
        this.revResult = `REV: ${this.rev}`;

        // Set flag to show the generated account information
        this.accountGenerated = true;
      } catch (error) {
        console.error('生成新帐户时出错:', error);
        // 错误处理
      }
    },
    copyToClipboard(valueKey) {
      const value = this[valueKey];

      // Create a temporary input element
      const tempInput = document.createElement('input');
      tempInput.value = value;
      document.body.appendChild(tempInput);

      // Select the input value
      tempInput.select();
      tempInput.setSelectionRange(0, 99999); // For mobile devices

      // Copy the text to the clipboard
      document.execCommand('copy');

      // Remove the temporary input
      document.body.removeChild(tempInput);

      alert(`Copied ${valueKey} to clipboard: ${value}`);
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
  margin-left: 385px;
  width:450px;
  background-color: rgba(238,238,238,0.8);
  border:none;
  border-radius: 20px;
  height:400px;
}

h2 {
  text-align: center;
  margin-top:0;
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
  margin-left: 130px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
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
#app {
  font-family: Arial, sans-serif;
  text-align: center;
}

input {
  width: 300px;
  padding: 8px;
  margin-bottom: 10px;
}

button {
  padding: 8px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.info-input {
  text-align: right; /* 添加这一行，使输入框右对齐 */
  width: 200px;
  padding: 8px;
}
.copy-button{
  height:23px;
  margin-left: 0px;
  width:80px;
}
</style>
