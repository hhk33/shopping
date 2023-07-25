import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
import store from '@/store'
import "swiper/css/swiper.css"
import '@/mock/mockServe'
import VueLazyload from 'vue-lazyload'
import loading from '@/assets/loading.gif'

Vue.config.productionTip = false

Vue.use(VueLazyload, {
  loading: loading
})

//注册全局组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)

new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this;
  }
}).$mount('#app')
