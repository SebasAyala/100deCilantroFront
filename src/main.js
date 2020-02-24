import Vue from 'vue'
import Router from 'vue-router'
import vuetify from './plugins/vuetify'
import App from './App'
import Home from './views/Home'
import Login from './views/Login'

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
    ]
});

new Vue({
    el: '#app',
    vuetify,
    router,
    render: h => h(App)
}).$mount('#app')