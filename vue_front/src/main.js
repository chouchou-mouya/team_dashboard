// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//引入Vue
import Vue from 'vue';
//引入router
import router from './router.js' 
//引入我們主要的vue元件
import App from './App';
import web_header from "./web-header";
import mymain from "./mymain";

// //引入svg套件
// import Icon from 'vue-svg-icon/Icon.vue';
// Vue.component('icon', Icon); 


Vue.config.productionTip = false;



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  /* 下方處理vue跟dgango的模組符號衝突問題 */
  // delimiters: ['${','}'],
  components: { mymain },
  template: '<mymain/>',/* 這個app是吃上方引入import的"./app" */
  /* 所以，要使用 .vue 元件的話都記得要先 import！！ */
});

