<template>
    <div>
        <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">管理員畫面</a>
        <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search">
        <ul class="navbar-nav px-3">
            <li class="nav-item text-nowrap">
            <a class="nav-link" href="#" @click.prevent="signOut">Sign out</a>
            </li>
        </ul>
        </nav>
    </div>
</template>

<script>
export default {
    methods: {
        // 登出
        signOut() {
            const api = `${process.env.APIPATH}/logout`;
            const _this = this;
            this.$http.post(api).then((response) => {
                console.log(response.data);
                if (response.data.success) {
                    _this.$router.push("/login");
                }
            })
        }
    }
}
</script>