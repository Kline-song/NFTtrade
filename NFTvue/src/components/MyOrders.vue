<template>
  <div>
    <h1>我的订单</h1>


    <table class="table">
      <thead>
        <tr>
          <th scope="col">产品ID</th>
          <th scope="col">买家</th>
          <th scope="col">卖家</th>
          <th scope="col">金额</th>
          <th scope="col">时间</th>
          <th scope="col" class="hidden"></th>
          <th scope="col">产品图片</th>
          <!-- 添加更多列标题 -->
        </tr>
      </thead>
      <tbody>
        <template v-for="(orderList, key, index1) in orders" :key="index1">
          <!-- <td>{{ order[0] }}</td>
          <td>{{ order[1] }}</td>
          <td>{{ order[2] }}</td>
          <td>{{ order[3] }}</td>
          <td>{{ order[4] }}</td>
          <td><img :src="getFullUrl(order[6])" alt="Product Image" class="img-thumbnail"></td> -->
          <tr v-for="(order, index2) in orderList">
              <template v-for="(orderItem, index3) in order" :key="index3">
                <td v-if="index3 <= 4">{{orderItem}}</td>
                <td v-else-if="index3 = 6">
                    <img :src="getFullUrl(orderItem)" alt="" class="img-thumbnail">
                </td>
              </template>
          </tr>
          <!-- 添加更多单元格 -->
        </template>
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
      orders: [],
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
        var userId = sessionStorage.getItem("revAddress");
        const response = await axios.post('http://localhost:3000/showAllOrders', { userId }, { withCredentials: true });
        if (response.data.code === 200) {
          this.orders = response.data.data;
        } else {
          console.error('Error getting orders:', response.data.message);
        }
      } catch (error) {
        console.error('Error:', error);
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
.hidden {
  visibility: hidden;
}
.order-item p {
  margin: 5px 0;
}
</style>
