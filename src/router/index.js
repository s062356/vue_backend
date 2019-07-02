// 官方元件
import Vue from 'vue';
import VueRouter from 'vue-router';

// 自訂的分頁元件
// import Home from '@/components/HelloWorld';
import Login from '@/components/pages/Login';
import Dashboard from '@/components/Dashboard';
import Products from '@/components/Products';
import Orders from '@/components/Orders';
import Tickets from '@/components/Tickets';
import CustomerOrder from '@/components/CustomerOrder';
import ShoppingCart from '@/components/ShoppingCart';
import CustomerCheckout from '@/components/CustomerCheckout';

Vue.use(VueRouter);

export default new VueRouter ({
    routes: [
        // 阻擋直接更改網址列
        {
            path: "*",
            redirect: "/login"
        },
        // {
        //     path: "/",
        //     name: "index",
        //     component: Home
        // },
        {
            path: "/login",
            name: "login",
            component: Login
        },
        // 管理員介面
        {
            name: "dashboard",
            path: "/admin",
            component: Dashboard,
            children: [
                // 產品頁
                {
                    name: "product",
                    path: "products",
                    component: Products,
                    meta: { requireAuth : true }
                }, 
                // 訂單頁
                {
                    name: "order",
                    path: "orders",
                    component: Orders,
                    meta: { requireAuth : true }
                },
                // 優惠券頁面
                {
                    name: "ticket",
                    path: "tickets",
                    component: Tickets,
                    meta: { requireAuth : true }
                }
            ]
        },
        {
           name: "dash_board",
           path: "/",
           component: Dashboard,
           children: [
                // 客戶訂單
                {
                    name: "customerorder",
                    path: "customer_order",
                    component: CustomerOrder
                },
                {
                    name: "customercheckout",
                    path: "customer_checkout/:orderId",
                    component: CustomerCheckout
                }
           ]
        },
        //購物車
        {
            name: "dash_Board",
            path: "/",
            component: Dashboard,
            children: [
                    // 客戶訂單
                    {
                        name: "shoppingcart",
                        path: "shopping_cart",
                        component: ShoppingCart
                    }
            ]
        }
    ]
}) 