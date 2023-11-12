<template>
  <div>
    <h1>我的订单</h1>

    <h2>卖家订单</h2>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">订单ID</th>
          <th scope="col">产品ID</th>
          <th scope="col">产品描述</th>
          <th scope="col">产品</th>
          <th scope="col">订单状态</th>
          <!-- 添加更多列标题 -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in sellerOrders" :key="order.id">
          <td>{{ order.order_id }}</td>
          <td>{{ order.product_id }}</td>
          <td>{{ order.productDescription }}</td>
          <td><img :src="getFullUrl(order.productCoverImage_url)" alt="Product Image" class="img-thumbnail"></td>
          <td>{{ getOrderStatus(order.order_status) }}</td>
          <!-- 添加更多单元格 -->
        </tr>
      </tbody>
    </table>

    <h2>买家订单</h2>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">订单ID</th>
          <th scope="col">产品ID</th>
          <th scope="col">产品描述</th>
          <th scope="col">产品</th>
          <th scope="col">订单状态</th>
          <!-- 添加更多列标题 -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in buyerOrders" :key="order.id">
          <td>{{ order.order_id }}</td>
          <td>{{ order.product_id }}</td>
          <td>{{ order.productDescription }}</td>
          <td><img :src="getFullUrl(order.productCoverImage_url)" alt="Product Image" class="img-thumbnail"></td>
          <td>{{ getOrderStatus(order.order_status) }}</td>
          <!-- 添加更多单元格 -->
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
import axios from 'axios';
export default {
  name: 'MyOrders',
  data() {
    return {
      currentTab: 'seller',
      currentSubTab: 'all',
      sellerOrders: [],
      buyerOrders: []
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
    async showALLOrders() {
      try {
        const response = await axios.get('http://localhost:3000/showAllOrders');
        if (response.data.code === 200) {
          this.sellerOrders = response.data.data.sellerOrders;
          this.buyerOrders = response.data.data.buyerOrders;
          console.log('sellerOrders:', this.sellerOrders);
          console.log('buyerOrders:', this.buyerOrders);
        } else {
          console.error('Error getting user products:', response.data.message);
        }
      } catch (error) {
        console.error(error);
      }
    },
    getFullUrl(relativeUrl) {
      return `http://localhost:3000${relativeUrl}`;
    },
    getOrderStatus(status) {
      switch (status) {
        case 0: return '已取消';
        case 1: return '待交易';
        case 2: return '已交易';
        case 3: return '待付款';
        default: return '未知状态';
      }
    }
  },
  created() {
    this.showALLOrders();
  }
};
</script>

<style scoped>
.order-page {
  max-width: 800px;
  /* 设置最大宽度 */
  margin-left: auto;
  /* 将页面居中 */
  margin-right: auto;
  /* 将页面居中 */
}

.table {
  margin-top: 20px;
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 15px;
}

.table th,
.table td {
  border: 1px solid #ddd;
  padding: 15px;
  text-align: left;
}

.img-thumbnail {
  width: 100px;
  height: auto;
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
