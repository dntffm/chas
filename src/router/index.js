import {createWebHistory, createRouter} from 'vue-router'

const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('../pages/auth/Index.vue'),
        meta: {
            auth: true
        }
    },
    {
        path: '/shop',
        name: 'shop',
        component: () => import('../pages/shop/Index.vue'),
        meta: {
            auth: true
        }
    },
    {
        path: '/transactions',
        name: 'transactions',
        component: () => import('../pages/transactions/Index.vue'),
        meta: {
            auth: true
        }
    },
    {
        path: '/wallet',
        name: 'wallet',
        component: () => import('../pages/wallet/Index.vue'),
        meta: {
            auth: true
        }
    },
    {
        path: '/',
        name: 'dashboard',
        component: () => import('../pages/dashboard/Index.vue'),
        meta: {
            auth: true
        }
    },
    {
        path: '/printbill',
        name: 'Print Bill',
        component: () => import('../components/PrintBill.vue'),
        meta: {
            auth: true
        }
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if(to.name !== 'login' && localStorage.getItem('token') === null) {
        next({
            path: 'login',
            replace: true
        })
    } else {
        next()
    }
})

export default router