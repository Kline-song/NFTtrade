// main.js

import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';
import router from './router';
import axios from 'axios';  // 引入axios

// 设置axios默认配置，使其可以发送cookie
axios.defaults.withCredentials = true;

const app = createApp(App);
app.use(router);
app.use(ElementPlus);
app.mount('#app');
