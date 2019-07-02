<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <table class="table">
            <thead>
                <th></th>
                <th>品名</th>
                <th>數量</th>
                <th>單價</th>
            </thead>
            <tbody>
                <tr v-for="item in cart.carts" :key="item.id">
                    <td class="align-middle">
                        <button type="button" class="btn btn-outline-danger btn-sm"
                        @click.prevent="deletedShoppingCart(item.id)">
                            <i class="far fa-trash-alt"></i>
                        </button>
                    </td>
                    <td class="align-middle">
                        {{ item.product.title }}
                        <div class="text-success" v-if="item.coupon">
                            已套用優惠券
                        </div>
                    </td>
                    <td class="align-middle">{{ item.qty }}</td>
                    <td class="align-middle text-left">{{ item.final_total | currency }}</td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="3" class="text-right">總計</td>
                    <td class="text-right">{{ cart.total | currency }}</td>
                </tr>
                <tr v-if="cart.total != cart.final_total">
                    <td colspan="3" class="text-right text-success">折扣價</td>
                    <td class="text-right text-success">{{ cart.final_total | currency }}</td>
                </tr>
            </tfoot>
        </table>
        <div class="input-group mb-3 input-group-sm">
            <input type="text" class="form-control" v-model="coupon_ticket" placeholder="請輸入優惠碼">
            <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button" @click.prevent="addCouponTicket">
                    套用優惠碼
                </button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            cart: [],
            isLoading: false,
            coupon_ticket: ''
        }
    },
    methods: {
        // 取得購物車中資料
        getCart() {
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
            const _this = this;
            this.isLoading = true;
            this.$http.get(api).then((response) => {
                _this.isLoading = false;
                _this.cart = response.data.data;
            })
        },
        // 刪除購物車的產品
        deletedShoppingCart(_shopping_cart_id) {
            const shopping_cart_id = _shopping_cart_id;
            const _this = this;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${shopping_cart_id}`;
            this.isLoading = true;
            this.$http.delete(api).then(() => {
                _this.isLoading = false;
                _this.getCart();
            })
        },
        // 套用優惠券
        addCouponTicket() {
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;
            const _this = this;
            const coupon = {
                code: _this.coupon_ticket
            };
            this.$http.post(api, { data: coupon } ).then((response) => {
                _this.getCart();
            })
        }
        
    },
    created() {
        this.getCart();
    }
}
</script>

<style scoped>
.pointer{
    cursor: pointer;
}
</style>
