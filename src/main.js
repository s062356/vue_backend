// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import vuemoment from 'vue-moment'; // test 測試中
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import "bootstrap";
import VeeValidate from 'vee-validate';
// import zhTWValidate from 'vee-validate/dist/locale/zh_TW';
import VueI18n from 'vue-i18n';

import App from './App';
import router from './router';
import "./bus";
import currencyFilter from "./filters/currency";
// 時間戳記格式
import timestampFilter from "./filters/timeStamp";

Vue.use(VueAxios, axios);
Vue.use(VueI18n);
// const i18n = new VueI18n({
//   locale: 'zhTW'
// });
Vue.use(VeeValidate, {
  // i18n,
  // dictionary: {
  //   zhTW
  // },
  events: 'input|blur'
});
Vue.use(vuemoment);
Vue.config.productionTip = false;
axios.defaults.withCredentials = true;
// 全域方式啟用
Vue.component("Loading", Loading);
Vue.filter("currency", currencyFilter);
Vue.filter("timestampFilter", timestampFilter);

/* eslint-disable no-new */
new Vue({
  // i18n,
  el: '#app',
  components: { App },
  template: '<App/>',
  router
})

// 判斷權限
router.beforeEach((to, from, next) => {
  // console.log("to :", to);
  if (to.meta.requireAuth) {
    const api = `${process.env.APIPATH}/api/user/check`;
    axios.post(api).then((response) => {
      if (response.data.success) {
        next();
      }else {
        next({
          path: "/login"
        })
      }
    })
  }else {
    next();
  }
})
