<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <div class="text-right">
            <button class="btn btn-primary mt-4"
            @click.prevent="openModal(true)">建立新的優惠券</button>
        </div>
        <table class="table table-striped mt-4">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">名稱</th>
                <th scope="col">優惠碼</th>
                <th scope="col">到期日</th>
                <th scope="col">折扣百分比(折數)</th>
                <th scope="col">是否啟用</th>
                <th scope="col">編輯</th>
                <th scope="col">刪除</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in tickets" :key="item.id">
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ item.title }}</td>
                <td>{{ item.code }}</td>
                <td>{{ item.due_date | timestampFilter }}</td>
                <td>{{ item.percent }} %</td>
                <td v-if="item.is_enable">
                    啟用
                </td>
                <td v-else>
                    尚未啟用
                </td>
                <td>
                    <button class="btn btn-primary" @click.prevent="openModal(false, item)">編輯</button>
                </td>
                <td>
                    <button class="btn btn-primary" @click.prevent="deletedTicket(item.id)">刪除</button>
                </td>
            </tr>
        </tbody>
        </table>

        <!-- Modal -->
        <div>
            <div class="modal fade" id="ticketModal" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content border-0">
                        <div class="modal-header bg-dark text-white">
                            <h5 class="modal-title" id="exampleModalLabel">
                            <span>新增優惠券</span>
                            </h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-sm-4">
                                    <div class="form-group">
                                        <label for="ticket_name">名稱</label>
                                        <input type="text" class="form-control" id="ticket_name"
                                            placeholder="優惠券名稱" v-model="tempticket.title"
                                            >
                                    </div>
                                </div>
                                <div class="col-sm-8">
                                    <div class="form-group">
                                        <label for="ticket_code">優惠碼</label>
                                        <input type="text" class="form-control" id="ticket_code"
                                            placeholder="請輸入標題" v-model="tempticket.code"
                                            >
                                    </div>
                                </div>
                                <div class="col-sm-8">
                                    <div class="form-group">
                                        <label for="ticket_date">到期日</label>
                                        <input type="date" class="form-control" id="ticket_date"
                                            placeholder="請輸入標題" 
                                            v-model="tempticket.due_date"
                                        >
                                        <!-- <input type="text" class="form-control" id="ticket_date"
                                            placeholder="請輸入標題" 
                                            v-model="showDate"
                                            v-else
                                        > -->
                                        
                                        <!-- <p>{{ ticket.due_date | timestampFilter }}</p> -->
                                    </div>
                                </div>
                                <div class="col-sm-8">
                                    <div class="form-group">
                                        <label for="ticket_preferential">折扣 % 數</label>
                                        <input type="number" class="form-control" id="ticket_preferential"
                                            placeholder="請輸入標題" v-model="tempticket.percent"
                                            :true-value="1"
                                            :false-value="0"
                                            >
                                    </div>
                                </div>
                                <div class="col-sm-8">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox"
                                        id="ticket_open" v-model="tempticket.is_enable"
                                        :true-value="1"
                                        :false-value="0"
                                        >
                                        <label class="form-check-label" for="ticket_open">
                                            是否啟用
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                            <button type="button" class="btn btn-primary" @click.prevent="newTickets">確認</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import $ from 'jquery';

export default {
    data() {
        return{
            tickets: [],
            tempticket: {},
            isLoading: false,
            isNew: false,
            showDate: ""
        }
    },
    methods: {
        // 新增優惠券
        newTickets() {
            let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon`;
            const _this = this;
            let httpMethod = "post";
            let date = (new Date(_this.tempticket.due_date)).getTime() / 1000;
            this.$set(_this.tempticket, "due_date", date);
            this.isLoading = true;
            // 編輯
            if (!this.isNew) {
                api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${_this.tempticket.id}`;
                httpMethod = "put";
            }
            this.$http[httpMethod](api, { data: _this.tempticket }).then((response) => {
                $("#ticketModal").modal("hide");
                _this.isLoading = false;
                _this.getTickets();
            })
        },
        // 彈跳視窗 新增/編輯
        openModal(_isNew, _item) {
            let isNew = _isNew;
            let item = _item;
            if (isNew) { // 新增
                this.isNew = true;
                this.tempticket = {};
            }else { // 編輯
                this.isNew = false;
                this.tempticket = Object.assign({}, item);
                let date = new Date(item.due_date * 1000);
                let Y = date.getFullYear() + '-';
                let M = (date.getMonth() + 1 < 10 ? '0'+ ( date.getMonth() + 1) : date.getMonth() + 1) + '-';
                let D = date.getDate() + ' ';
                this.showDate = Y + M + D;
            }
            $("#ticketModal").modal("show");
        },
        // 取得優惠券資料
        getTickets(_page = 1) {
            let page = _page;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupons?page=${page}`;
            const _this = this;
            this.isLoading = true;
            this.$http.get(api).then((response) => {
                console.log(response.data);
                _this.isLoading = false;
                _this.tickets = response.data.coupons;
            })
        },
        // 刪除優惠券
        deletedTicket(_id) {
            let id = _id;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${id}`;
            const _this = this;
            this.isLoading = true;
            this.$http.delete(api).then((response) => {
                console.log(response);
                _this.isLoading = false;
                _this.getTickets();
            })
        }
    },
    created() {
        this.getTickets();
    }
}
</script>
