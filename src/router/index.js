import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'

Vue.use(VueRouter)

//重写 push、replace 方法
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject)
        originPush.call(this, location, resolve, reject)
    else
        originPush.call(this, location, () => { }, () => { })
}

VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject)
        originReplace.call(this, location, resolve, reject)
    else
        originReplace.call(this, location, () => { }, () => { })
}

let router = new VueRouter({
    routes,
    //路由跳转后将滚轮固定到顶点
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
})

//已有token，跳转到login，不放行
router.beforeEach(async (to, from, next) => {
    let token = store.state.user.token
    let userInfo = store.state.user.userInfo.name
    //登录
    if (token) {
        if (to.path == '/login') {
            next('/home')
        } else {
            if (userInfo) {
                next()
            } else {
                try {
                    await store.dispatch("user/userInfo")
                    next()
                } catch (error) {
                    //token失效
                    await store.dispatch("user/userLogout")
                    next('/login')
                }
            }
        }
        //未登录
    } else {
        if (to.path.indexOf('trade') != -1 || to.path.indexOf('pay') != -1 || to.path.indexOf('center') != -1) {
            next(`/login?redirect=${to.path}`)
        }
        else {
            next()
        }
    }
})


export default router