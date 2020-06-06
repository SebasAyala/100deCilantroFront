import Vue from 'vue'
import Router from 'vue-router'
import vuetify from './plugins/vuetify'
import App from './App'
import Movie from './components/Movie'
import Admin from './views/Admin'
import Dashboard from './views/Dashboard'
import Home from './views/Home'
import Login from './views/Login'
import Register from './views/Register'
import Bookings from './views/Bookings'
import Movies from './views/Movies'
import NewMovie from './views/NewMovie'
import Users from './views/Users'
import store from './store'
import axios from './axios'
import Vuex from 'vuex'

Vue.use(Router);

let router = new Router({
    routes: [
        {
            path: '/',
            component: Home,
            children: [
                {
                    name: 'home',
                    path: '',
                    component: Movie
                },
                {
                    name: 'bookings',
                    path: 'bookings',
                    component: Bookings
                },
                {
                    name: 'register',
                    path: 'register',
                    component: Register,
                }
            ]
        },
        {
            name: 'login',
            path: '/login',
            component: Login,
        },
        {
            path: '/admin',
            component: Admin,
            children: [
                {
                    name: 'dashboard',
                    path: '',
                    component: Dashboard,
                },
                {
                    name: 'users',
                    path: 'users',
                    component: Users,
                },
                {
                    name: 'movies',
                    path: 'movies',
                    component: Movies,
                },
                {
                    name: 'new-movie',
                    path: 'movies/new',
                    component: NewMovie,
                },
            ]
        }
    ]
});


Vue.config.productionTip = false;
Vue.prototype.$http = axios; 
axios.defaults.timeout = 10000;
axios.interceptors.request.use(
    config => {
        const token = 'Bearer ' + localStorage.access_token
        if (token) {
            config.headers.common["Authorization"] = token
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
axios.interceptors.response.use(
    response => {
        if (response.status === 200 || response.status === 201) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    error => {
        if (error.response.status) {
            return Promise.reject(error.response);
        }
    }
);


new Vue({
    el: '#app',
    axios,
    router,
    store,
    vuetify,
    Vuex,
    render: h => h(App)
}).$mount('#app')