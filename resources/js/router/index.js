import { createWebHistory, createRouter } from 'vue-router'
import store from '@/store'

/* Guest Component */
const Login = () => import('@/components/auth/Login.vue')
const Register = () => import('@/components/auth/Register.vue')
/* Guest Component */

/* Authenticated Component */
const Home = () => import('@/pages/Home.vue')
const Dashboard = () => import('@/pages/Dashboard.vue')
/* Authenticated Component */

const routes = [
    {
        name: "home",
        path: "/",
        component: Home,
        meta: {
            middleware: "guest",
            title: `Inicio`
        }
    },
    {
        name: "login",
        path: "/login",
        component: Login,
        meta: {
            middleware: "guest",
            title: `Login`
        }
    },
    {
        name: "register",
        path: "/register",
        component: Register,
        meta: {
            middleware: "guest",
            title: `Register`
        }
    },
    {
        name: "dashboard",
        path: "/dashboard",
        component: Dashboard,
        meta: {
            middleware: "auth",
            title: `Dashboard`
        },
        // children: [
        //     {
        //         name: "dashboard",
        //         path: '/',
        //         component: Dashboard,
        //         meta: {
        //             title: `Dashboard`
        //         }
        //     }
        // ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes, // short for `routes: routes`
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    if (to.meta.middleware == "guest") {
        if (store.state.auth.authenticated) {
            next({ name: "dashboard" })
        }
        next()
    } else {
        if (store.state.auth.authenticated) {
            next()
        } else {
            next({ name: "login" })
        }
    }
})

export default router