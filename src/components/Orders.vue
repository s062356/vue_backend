<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col" width="150">購買時間</th>
                    <th scope="col"  width="300">Email</th>
                    <th scope="col">購買款項</th>
                    <th scope="col">應付金額</th>
                    <th scope="col" width="150">是否付款</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in Orders.orders" :key="item.id">
                    <th scope="row">{{ item.create_at | timestampFilter }}</th>
                    <td width="300">{{ item.user.email }}</td>
                    <td>
                        <p v-for="product_information in item.products" :key="product_information.id">
                            {{ product_information.product.title }}
                        </p>
                    </td>
                    <td>{{ item.total | currency }}</td>
                    <td width="150" v-if="item.is_paid">是</td>
                    <td width="150" v-else>否</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            Orders: {},
            isLoading: false
        }
    },
    methods: {
        // 取得訂單列表
        getOrders(page = 1) {
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/orders?page=${page}`;
            const _this = this;
            this.isLoading = true;
            this.$http.get(api).then((response) => {
                this.Orders = response.data;
                _this.isLoading = false;
            })
        }
    },
    created() {
        this.getOrders();
    }
}
</script>


<style scoped>
table {
    margin-top: 80px;
}
</style>
