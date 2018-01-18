// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import store from './store/store'; // vuex
import VueRouter from 'vue-router';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import App from './App';
import Index from './views/index/index';
import Table from './views/table/table';
import Form from './views/form/form';
import testForm from './views/testForm/testForm';
import select from './views/select/select';
// import tree from './views/tree/tree';
import transfer from './views/transfer/transfer';
import Cascader from './views/Cascader/Cascader';
import test from './views/test/test';
import test2 from './views/test/test2';
// import ue from './views/editor/editor';
import 'font-awesome/css/font-awesome.min.css';
import Mock from './mock/mock';
import FormCommon from './util/form';
import Tools from './util/tools';

// import '../static/UE/ueditor.config.js'
// import '../static/UE/ueditor.all.min.js'
// import '../static/UE/lang/zh-cn/zh-cn.js'
// import '../static/UE/ueditor.parse.min.js'
import _ from 'lodash'

Mock.mockData();
Vue.use(VueRouter);// 安装路由功能
/* eslint-disable no-new */
Vue.use(VueRouter);
Vue.prototype.$http = axios;
Vue.use(ElementUI);
Vue.use(FormCommon);
Vue.use(Tools);
Vue.prototype._ = _

// 后端对比cookies判断是否登录，凡接口response的header带有x-auth-token的即未登录，跳转首页。
// Vue.http.interceptors.push((request, next) => {
//   request.credentials = true;
//   next((response) => {
//     let messageHeader;
//     /* global IS_PRODUCTION:true */
//     if (IS_PRODUCTION) {
//       messageHeader = "X-Auth-Token";
//     } else {
//       messageHeader = "x-auth-token";
//     }
//     if (messageHeader in response.headers.map) {
//       router.push({path: '/login'});
//     }
//     return response
//   });
// });
let routes = [
  {
    path: '/',
    component: App,
    children: [
      // {path: '/index', component: Index, name: 'index', class: 'fa-line-chart'},
      // {path: '/tree', component: tree, name: 'tree', class: 'fa-plug'},
      // {path: '/editor', component: ue, name: 'editor', class: 'fa-plug'},
      {path: '/table', component: Table, name: 'table', class: 'fa-table'},
      {path: '/form', component: Form, name: 'form', class: 'fa-newspaper-o'},
      {path: '/testForm', component: testForm, name: 'testForm', class: 'fa-plug'},
      {path: '/select', component: select, name: 'select', class: 'fa-plug'},
      {path: '/transfer', component: transfer, name: 'transfer', class: 'fa-plug'},
      {path: '/Cascader', component: Cascader, name: 'Cascader', class: 'fa-plug'},
      {path: '/test', component: test, name: 'test', class: 'fa-plug'},
      {path: '/test2', component: test2, name: 'test2', class: 'fa-plug'}
    ]
  }
];
let router = new VueRouter({
  // 'mode': 'history', 去掉URL的#号，需要配置服务器http://router.vuejs.org/zh-cn/essentials/history-mode.html
  'linkActiveClass': 'active',
  routes
});
let app = new Vue({
  router,
  store
}).$mount('#app');
export default app;
