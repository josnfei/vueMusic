// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'  //解决es6的promise问题补丁
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'  //解决移动端300ms延迟
import VueLazyload from 'vue-lazyload'  //懒加载

import 'common/stylus/index.styl'

fastclick.attach(document.body)

Vue.use(VueLazyload, {
  loading: require('./common/image/default.png')
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
