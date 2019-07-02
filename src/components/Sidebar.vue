<template>
    <div>
        <nav class="col-md-2 d-none d-md-block bg-light sidebar">
            <div class="sidebar-sticky">
                <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                <span>管理員頁面</span>
                <a class="d-flex align-items-center text-muted" href="#">
                    <span data-feather="plus-circle"></span>
                </a>
                </h6>
                <ul class="nav flex-column mb-2">
                    <li class="nav-item">
                        <router-link class="nav-link active" to="/admin/products" 
                        v-if="now_path == '/admin/products'" @click.prevent="active_position">
                            <i class="fas fa-box"></i>
                                產品列表
                        </router-link>
                        <router-link v-else class="nav-link" to="/admin/products" @click.prevent="active_position">
                            <i class="fas fa-box"></i>
                                產品列表
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link active" href="#" to="/admin/orders" 
                        v-if="now_path == '/admin/orders'"
                        @click.prevent="active_position">
                            <i class="fas fa-list"></i>
                                訂單列表
                        </router-link>
                        <router-link class="nav-link" href="#" to="/admin/orders" 
                        v-else
                        @click.prevent="active_position">
                            <i class="fas fa-list"></i>
                                訂單列表
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" href="#" to="/admin/tickets">
                            <i class="fas fa-ticket-alt"></i>
                            優惠券
                        </router-link>
                    </li>
                </ul>
                <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                <span>模擬功能</span>
                <a class="d-flex align-items-center text-muted" href="#">
                    <span data-feather="plus-circle"></span>
                </a>
                </h6>
                <ul class="nav flex-column mb-2">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/customer_order">
                            <i class="fas fa-list"></i>
                            模擬訂單
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/shopping_cart">
                            <i class="fas fa-list"></i>
                            購物車清單
                        </router-link>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>
<script>
export default {
    data() {
        return {
            now_path: {}
        }
    },
    methods: {
        active_position() {
            
        }
    },
    created() {
        
    }
}
</script>


