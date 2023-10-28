<template>
  <div>
    <h1>我的钱包</h1>
    <p>余额: {{ balance }}</p>

    <h3>充值</h3>
    <input type="number" v-model="depositAmount" placeholder="请输入充值金额" />
    <button @click="deposit">充值</button>

    <h3>提现</h3>
    <input type="number" v-model="withdrawAmount" placeholder="请输入提现金额" />
    <button @click="withdraw">提现</button>

    <h3>钱包账单</h3>
    <ul>
      <li v-for="transaction in transactions" :key="transaction.id">
        {{ transaction.type }} | {{ transaction.amount }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name:'MyWallet',
  data() {
    return {
      balance: 0,
      depositAmount: 0,
      withdrawAmount: 0,
      transactions: [],
    };
  },
  methods: {
    deposit() {
      if (this.depositAmount > 0) {
        this.balance += this.depositAmount;
        this.transactions.push({ id: Date.now(), type: '充值', amount: this.depositAmount });
        this.depositAmount = 0;
      }
    },
    withdraw() {
      if (this.withdrawAmount > 0 && this.withdrawAmount <= this.balance) {
        this.balance -= this.withdrawAmount;
        this.transactions.push({ id: Date.now(), type: '提现', amount: this.withdrawAmount });
        this.withdrawAmount = 0;
      }
    },
  },
};
</script>


<style scoped>

</style>