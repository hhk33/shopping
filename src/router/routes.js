
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from "@/pages/ShopCart"
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
import myOrder from '@/pages/Center/myOrder'
import groupOrder from '@/pages/Center/groupOrder'

export default [
    {
        path: '/',//重定向
        redirect: '/home'
    }
    ,
    {
        path: "/home",
        component: () => import('@/pages/Home'),
        meta: {
            footerShow: true
        }
    },
    {
        path: "/search/:keyword?",
        component: () => import('@/pages/Search'),
        name: 'Search',
        meta: {
            footerShow: true
        },
    },
    {
        path: "/login",
        name: 'Login',
        component: () => import('@/pages/Login'),
        meta: {
            footerShow: false
        }
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
        meta: {
            footerShow: false
        }
    },
    {
        path: "/detail",
        name: "Detail",
        component: Detail,
        meta: {
            footerShow: true
        }
    },
    {
        path: "/addCartSuccess",
        name: "AddCartSuccess",
        component: AddCartSuccess,
        meta: {
            footerShow: true
        }
    },
    {
        path: "/shopCart",
        name: "ShopCart",
        component: ShopCart,
        meta: {
            footerShow: true
        }
    },
    {
        path: "/trade",
        name: 'Trade',
        component: Trade,
        meta: {
            footerShow: true
        },
        beforeEnter: (to, from, next) => {
            if (from.path == '/shopCart' || from.path == '/')
                next()
            else
                next(false)
        }
    },
    {
        path: '/pay',
        name: 'Pay',
        component: Pay,
        meta: {
            footerShow: true
        }
    },
    {
        path: '/paySuccess',
        name: 'PaySuccess',
        component: PaySuccess,
        meta: {
            footerShow: true
        }
    },
    {
        path: '/center',
        name: 'Center',
        redirect: '/center/myorder',
        component: Center,
        meta: {
            footerShow: true
        },
        children: [
            {
                path: 'myorder',
                component: myOrder
            },
            {
                path: 'groupOrder',
                component: groupOrder
            },

        ]
    }
]