import userdive from 'userdive'
import Vue from 'vue'
import VueRouter from 'vue-router'

const _ud = userdive()
Vue.use(VueRouter)

const sample1 = { template: '<router-link to="sample2">Sample2</router-link>' }
const sample2 = { template: '<router-link to="sample1">Sample1</router-link>' }

const router = new VueRouter({
  routes: [
    { path: '/sample1', name: 'sample1', component: sample1 },
    { path: '/sample2', name: 'sample2', component: sample2 },
    { path: '/**', redirect: 'sample1' },
  ],
})

new Vue({
  mounted() {
    _ud('create', 'af57h6gb', 'auto')
  },
  router,
}).$mount('#app')

router.afterEach(() => {
  _ud('send', 'pageview', location.href)
})
