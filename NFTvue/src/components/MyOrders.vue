<template>
  <h1>我的订单</h1>
  <div class="order-page">
    <div class="tabs">
      <div
          class="tab"
          :class="{ active: currentTab === 'seller' }"
          @click="changeTab('seller')"
      >
        卖家端
      </div>
      <div
          class="tab"
          :class="{ active: currentTab === 'buyer' }"
          @click="changeTab('buyer')"
      >
        买家端
      </div>
    </div>
    <div class="sub-tabs">
      <div
          class="sub-tab"
          :class="{ active: currentSubTab === 'all' }"
          @click="changeSubTab('all')"
      >
        全部
      </div>
      <div
          class="sub-tab"
          :class="{ active: currentSubTab === 'pending' }"
          @click="changeSubTab('pending')"
      >
        待付款
      </div>
      <div
          class="sub-tab"
          :class="{ active: currentSubTab === 'completed' }"
          @click="changeSubTab('completed')"
      >
        已完成
      </div>
      <div
          class="sub-tab"
          :class="{ active: currentSubTab === 'cancelled' }"
          @click="changeSubTab('cancelled')"
      >
        已取消
      </div>
    </div>
    <div class="order-list">
      <div v-for="order in filteredOrders" :key="order.orderId" class="order-item">
        <p>订单编号: {{ order.orderId }}</p>
        <p>商品ID: {{ order.productId }}</p>
      </div>
      <p v-if="filteredOrders.length === 0">没有订单信息</p>
    </div>
  </div>
</template>

<script>
export default {
  name:'MyOrders',
  data() {
    return {
      currentTab: 'seller',
      currentSubTab: 'all',
      orders: [
        { orderId: 1, productId: 1, role: 'seller', status: 'pending' },
        { orderId: 2, productId: 2, role: 'seller', status: 'completed' },
        { orderId: 3, productId: 3, role: 'seller', status: 'cancelled' },
        { orderId: 4, productId: 4, role: 'buyer', status: 'pending' },
        { orderId: 5, productId: 5, role: 'buyer', status: 'completed' },
        { orderId: 6, productId: 6, role: 'buyer', status: 'cancelled' },
      ]
    };
  },
  computed: {
    filteredOrders() {
      return this.orders.filter(order => {
        if (this.currentTab === 'seller' && order.role === 'seller') {
          return this.currentSubTab === 'all' || order.status === this.currentSubTab;
        } else if (this.currentTab === 'buyer' && order.role === 'buyer') {
          return this.currentSubTab === 'all' || order.status === this.currentSubTab;
        }
        return false;
      });
    }
  },
  methods: {
    changeTab(tab) {
      this.currentTab = tab;
    },
    changeSubTab(subTab) {
      this.currentSubTab = subTab;
    }
  }
};
</script>

<style scoped>
.order-page {
  max-width: 800px; /* 设置最大宽度 */
  margin-left: auto; /* 将页面居中 */
  margin-right: auto; /* 将页面居中 */
}

.tabs {
  display: flex;
}

.tab {
  flex: 1;
  padding: 10px;
  text-align: center;
  cursor: pointer;
  background-color: #eee;
}

.tab.active {
  background-color: #ccc;
}

.sub-tabs {
  display: flex;
  margin-top: 10px;
}

.sub-tab {
  flex: 1;
  padding: 5px;
  text-align: center;
  cursor: pointer;
  background-color: #eee;
}

.sub-tab.active {
  background-color: #ccc;
}

.order-list {
  margin-top: 20px;
}

.order-item {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}

.order-item p {
  margin: 5px 0;
}
</style>
