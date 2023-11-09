<template>
  <div class="wallet-container">
    <h1>我的钱包</h1>
    <div class="balance-info">
      <p>余额: <span class="balance">{{ balance }}</span></p>
    </div>

    <div class="actions">
      <div class="deposit">
        <h3>充值</h3>
        <input type="number" v-model.number="depositAmount" placeholder="请输入充值金额" class="input-field" />
        <button @click="handleDeposit" class="btn-deposit">充值</button>
      </div>

      <!-- ...其他代码... -->
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'MyWallet',
  data() {
    return {
      balance: 0,
      depositAmount: 0,
      // ...其他数据...
    };
  },
  created() {
    this.fetchBalance();
  },
  methods: {
    async fetchBalance() {
      // 假设 '/api/user/balance' 是获取用户余额的API
      try {
        const response = await axios.get('http://localhost:3000/showCurrency ', { withCredentials: true });
        if (response.data.code === 200) {
          this.balance = response.data.data.currency; // 假设后端返回的是 { data: { currency: value } }
        } else {
          alert('获取余额失败：' + response.data.message);
        }
      } catch (error) {
        console.error('获取余额错误:', error);
        alert('无法获取余额');
      }
    },
    async handleDeposit() {
      if (this.depositAmount > 0) {
        try {
          const response = await axios.post('http://localhost:3000/addCurrency', {
            currency: this.depositAmount
          }, { withCredentials: true });
          const { data } = response;
          if (data.code === 200) {
            this.fetchBalance(); // 充值成功后重新获取余额
            alert('充值成功');
          } else {
            alert(data.message);
          }
        } catch (error) {
          console.error('充值失败:', error);
          alert('充值过程中出现错误');
        }
      }
      this.depositAmount = 0; // 重置输入的充值金额
    },
    // ...其他方法...
  },
};
</script>

<!-- ...样式... -->
<style scoped>
.wallet-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
}

.balance-info {
  margin-bottom: 20px;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.balance {
  font-weight: bold;
  color: rgba(177, 25, 26, 1);
}

.actions {
  margin-bottom: 20px;
}

.input-field {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

.btn-deposit {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: rgba(177, 25, 26, 1);
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-deposit:hover {
  background-color: rgba(177, 25, 26, 1);
}

/* 可以根据需要添加更多的样式 */
</style>