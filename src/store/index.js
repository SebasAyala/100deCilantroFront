import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({

    state: {
        user: null,
    },
    mutations: {
        /*
        [LOGGED](userLogged) {
            state.user = userLogged;
        }
        */
    },
    actions: {
        login(context, emailUser, passwordUser) {
            return axios.post('http://127.0.0.1:8000/api/login', {
                email: emailUser,
                password: passwordUser
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }

});