import Vue from 'vue'
import App from './App.vue'
import {Pagination,Table} from 'ant-design-vue';
import Antd from 'ant-design-vue';
Vue.use(Table)
Vue.use(Pagination)
Vue.use(Antd)
Vue.config.productionTip = false
import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'ant-design-vue/dist/antd.css';
new Vue({
  render: h => h(App),
}).$mount('#app')
