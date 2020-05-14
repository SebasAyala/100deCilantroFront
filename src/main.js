import Vue from 'vue'
import Router from 'vue-router'
import vuetify from './plugins/vuetify'
import App from './App'
import Admin from './views/Admin'
import Home from './views/Home'
import Login from './views/Login'
import Movies from './views/Movies'
import NewMovie from './views/NewMovie'
import Users from './views/Users'
import store from './store'
import axios from 'axios'
import Vuex from 'vuex';

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
        {
            name: 'movies',
            path: '/admin/movies',
            component: Movies,
        },
        {
            name: 'new-movie',
            path: '/admin/movies/new',
            component: NewMovie,
        },
    ]
});

new Vue({
    el: '#app',
    axios,
    router,
    store,
    vuetify,
    Vuex,
    render: h => h(App)
}).$mount('#app')