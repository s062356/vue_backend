<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <div class="row mt-4">
            <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
                <div class="card border-0 shadow-sm">
                    <div style="height: 150px; background-size: cover; background-position: center"
                        :style="{backgroundImage: `url(${item.imageUrl})`}">
                    </div>
                    <div class="card-body">
                        <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
                        <h5 class="card-title">
                            <a href="#" class="text-dark">{{ item.title }}</a>
                        </h5>
                        <p class="card-text">內容</p>
                        <div class="d-flex justify-content-between align-items-baseline">
                            <!-- <div class="h5">2,800 元</div> -->
                            <div class="h5" v-if="!item.price">原價 {{ item.origin_price | currency }} 元</div>
                            <del class="h6" v-if="item.price">原價 {{ item.origin_price | currency }} 元</del>
                            <div class="h5" v-if="item.price">現在只要 {{ item.price | currency }} 元</div>
                        </div>
                    </div>
                    <div class="card-footer d-flex">
                        <button type="button" class="btn btn-outline-secondary btn-sm" @click.prevent="getProduct(item.id)">
                            <i class="fas fa-spinner fa-spin" v-if="status.loadingItem == item.id"></i>
                                查看更多
                        </button>
                        <button type="button" class="btn btn-outline-danger btn-sm ml-auto" @click.prevent="addCart(item.id, true)">
                            <i class="fas fa-spinner fa-spin" v-if="status.loadingItem == item.id"></i>
                                加到購物車
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- modal -->
            <div class="modal fade" id="oneProductModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">{{ product.title }}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="photo_area">
                                <img :src="product.imageUrl" class="photo">
                            </div>
                            <div class="mt-4">
                                <h3>{{ product.title }}</h3>
                            </div>
                            <!-- 價格 -->
                            <div class="flex_box">
                                <p>原價 {{ product.origin_price | currency }}</p>
                                <h3>現在只要 {{ product.price | currency }}</h3>
                            </div>
                            <!-- 數量 -->
                            <div class="number_area">
                                <p>選購數量</p>
                                <i class="fas fa-minus" @click.prevent="addStock(false)"></i>
                                <input type="number" id="number_box" class="input_number_box" value="1" max="10" min="1"> 
                                <i class="fas fa-plus" @click.prevent="addStock(true)"></i>  
                            </div>
                        </div>
                        <hr/>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" @click.prevent="addCart(product.id, false)">加進購物車</button>
                        </div>
                    </div>
                </div>
            </div>
        <!-- 新增訂單 -->
        <div class="my-5 row justify-content-center">
            <form class="col-md-6" @submit.prevent="newOrder">
                <div class="form-group">
                    <label for="useremail">Email*</label>
                    <input type="email" class="form-control" name="email" id="useremail"
                        v-validate="'required|email'"
                        v-model="form.user.email" placeholder="請輸入 Email">
                    <span class="text-danger" v-if="errors.has('email')">
                        {{ errors.first('email') }}
                    </span>
                </div>
            
                <div class="form-group">
                    <label for="username">收件人姓名*</label>
                    <input type="text" class="form-control" name="name" id="username"
                        v-model="form.user.name" placeholder="輸入姓名" v-validate="'required'"
                        :class="{'is-invalid': errors.has('name')}">
                    <span class="text-danger" v-if="errors.has('name')">name is empty</span>
                </div>
            
                <div class="form-group">
                    <label for="usertel">收件人電話*</label>
                    <input type="number" class="form-control" id="usertel" name="phone"
                        :class="{'is-invalid' : errors.has('phone')}"
                        v-validate="'required'"
                        v-model="form.user.tel" placeholder="請輸入電話">
                    <span class="text-danger" v-if="errors.has('phone')">phone is empty</span>
                </div>
            
                <div class="form-group">
                    <label for="useraddress">收件人地址*</label>
                    <input type="text" class="form-control" name="address" id="useraddress" 
                        v-model="form.user.address"
                        v-validate="'required'"
                        :class="{'is-invalid': errors.has('address')}"
                        placeholder="請輸入地址">
                    <span class="text-danger" v-if="errors.has('address')">address is empty</span>
                </div>
            
                <div class="form-group">
                    <label for="comment">留言</label>
                    <textarea name="" id="comment" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
                </div>
                <div class="text-right">
                    <button class="btn btn-danger">送出訂單</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';
export default {
    data() {
        return {
            products: [],
            product: {},
            status: {
                loadingItem: ''
            },
            form: {
                user: {
                    name: "",
                    email: "",
                    tel: "",
                    address: ""
                },
                message: ""
            },
            isLoading: false,
            coupon_code: ''
        }
    },
    methods: {
        // 取得多項產品資料
        getProducts(_page = 1) {
            const page = _page;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products?page=${page}`;
            const _this = this;
            this.isLoading = true;
            this.$http.get(api).then((response) => {
                _this.isLoading = false;
                _this.products = response.data.products;
            })
        },
        // 取得單一產品資料
        getProduct(_product_Id) {
            const product_Id = _product_Id;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${product_Id}`;
            const _this = this;
            this.status.loadingItem = product_Id;
            $("#oneProductModal").modal("show");
            this.$http.get(api).then((response) => {
                _this.product = response.data.product;
                _this.status.loadingItem = '';
            })

        },
        // 新增訂單 (後端會將購物車中商品清空)
        newOrder() {
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;
            const _this = this;
            let order = this.form;
            this.isLoading = true;
            this.$validator.validate().then((response) => {
                if (response) {
                    this.$http.post(api, { data: order }).then((response) => {
                        if (response.data.success) {
                            _this.isLoading = false;
                            _this.$router.push(`/customer_checkout/${response.data.orderId}`);
                        }
                        
                    })
                } else {
                    console.log("欄位不完整");
                }
            });
        },
        // 將產品加入購物車
        addCart(_product_id, _status) {
            const product_id = _product_id;
            const status = _status;
            const _this = this;
            // 數量會改變
            if (!status) {
                var qty = Number($("#number_box").val());
            }else { // 數量固定
                var qty = 1;
            }
            let cart = {
                product_id: product_id,
                qty: qty
            }
            this.isLoading = true;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
            this.$http.post(api, { data: cart }).then((response) => {
                $("#oneProductModal").modal("hide");
                _this.isLoading = false;
            })

        },
        // 購買數量
        addStock(_qty) {
            let qty = _qty;
            let product_qty = Number($("#number_box").val())
            // console.log(typeof(product_qty));
            if (qty) {
                product_qty += 1;
                if (product_qty < 10) {
                    $("#number_box").val(product_qty);
                }
            } else {
                product_qty -= 1;
                if (product_qty > 0) {
                    $("#number_box").val(product_qty);
                }
            }
            
        }
        
    },
    created() {
        this.getProducts();
    }
}
</script>

<style scoped>
.photo_area {
    max-width: 500px;
    max-height: 700px;
}
.photo {
    max-width: 100%;
    max-height: 500px;
}

.flex_box {
    display: flex;
    justify-content: space-between;
}

.flex_box p {
    line-height: 40px;
    text-decoration: line-through;
}

.input_number_box {
    height: 35px;
}

.number_area i {
    cursor: pointer;
}

</style>
