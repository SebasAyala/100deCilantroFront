import Vue from 'vue'
import Router from 'vue-router'
import vuetify from './plugins/vuetify'
import App from './App'
import Admin from './views/Admin'
import Home from './views/Home'
import Login from './views/Login'
import Users from './views/Users'

Vue.use(Router);

let router = new Router({
    routes: [
        {
            name: 'home',
            path: '/',
            component: Home,
        },
        {
            name: 'login',
            path: '/login',
            component: Login,
        },
        {
            name: 'admin',
            path: '/admin',
            component: Admin,
        },
        {
            name: 'users',
            path: '/admin/users',
            component: Users,
        },
    ]
});

new Vue({
    el: '#app',
    vuetify,
    router,
    render: h => h(App)
}).$mount('#app')