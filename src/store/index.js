import Vue from 'vue';
import Vuex from 'vuex';
import axios from '@/axios'

Vue.use(Vuex);

export default new Vuex.Store({

    state: {
        userBookings: [],
        currentUser: [],
        movies: [],
        schedules: [],
        statusLogin: false,
        users: []
    },
    getters: {
        getUserBookings(state){
            return state.userBookings
        },
        getCurrentUser(state){
            return state.currentUser
        },
        getMovies(state){
            return state.movies
        },
        getSchedules(state){
            return state.schedules
        },
        getStatusLogin(state){
            return state.statusLogin
        },
        getUsers(state){
            return state.users
        }
    },
    actions: {
        showErrors(context, err){
            console.log(err.config);
            if (err.response) {
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers);
            } else if (err.request) {
                console.log(err.request);
            } else {
                console.log('Error', err.message);
            }
        },
        allMovies(context){
            axios.get('getMovie')
                .then((res)=>{
                    context.commit('movies', res.data)
                }, 200)
                .catch((err)=>{
                    this.dispatch('showErrors', err)
                })
        },
        allUsers(context){
            axios.get('allUSers')
                .then((res) => {
                    context.commit('users', res.data)
                }, 200)
                .catch((err) => {
                    this.dispatch('showErrors', err)
                })
        },
        currentUser(context){
            axios.post('me')
                .then((res) => {
                    context.commit('currentUser', res.data)
                    context.commit('statusLogin', true)
                })
                .catch((err) => {
                    context.commit('currentUser', null)
                    context.commit('statusLogin', false)
                    this.dispatch('showErrors', err)
                })
        },
        currentBookings(context, user){
            axios.post('bookings', {'user': user})
                .then((res) => {
                    context.commit('userBookings', res.data)
                }, 200)
                .catch((err) => {
                    this.dispatch('showErrors', err)
                })
        },
        scheduleMovie(context, id){
            axios.get('getDataMovie/' + id)
                .then((res)=>{
                    context.commit('schedules', res.data)
                }, 200)
                .catch((err)=>{
                    this.dispatch('showErrors', err)
                })
        }
    },
    mutations: {
        currentUser(state, data){
            return state.currentUser = data
        },
        movies(state, data){
            return state.movies = data
        },
        schedules(state, data){
            return state.schedules = data
        },
        statusLogin(state, data){
            return state.statusLogin = data
        },
        userBookings(state, data){
            return state.userBookings = data
        },
        users(state, data) {
            return state.users = data
        }
    }
});