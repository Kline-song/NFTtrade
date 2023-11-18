import { createRouter, createWebHistory } from 'vue-router';
import Login from "../components/Login.vue";
import Home from "../components/Home.vue";
import Register from "../components/Register.vue";
import Product from "@/components/Product.vue";
import PersonalCenter from "@/components/PersonalCenter.vue";
import PersonalInfo from '@/components/PersonalInfo.vue'
import MyCollections from '@/components/MyCollections.vue'
import MyOrders from '@/components/MyOrders.vue'
import MyWallet from '@/components/MyWallet.vue'

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
    },
    {
        path: '/product/:product_id',
        name: 'Product',
        component: Product,
    },
    {
        path: '/personalcenter',
        name: 'PersonalCenter',
        component: PersonalCenter,
        children: [
            {
                path: '/personalcenter/personalinfo',
                name: 'PersonalInfo',
                component: PersonalInfo,
                props: true // 使用props传递路由参数
            },
            {
                path: '/personalcenter/mycollections',
                name: 'MyCollections',
                component: MyCollections,
                props: true // 使用props传递路由参数
            },
            {
                path: '/personalcenter/myorders',
                name: 'MyOrders',
                component: MyOrders,
                props: true // 使用props传递路由参数
            },
            {
                path: '/personalcenter/mywallet',
                name: 'MyWallet',
                component: MyWallet,
                props: true // 使用props传递路由参数
            }
        ]
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
