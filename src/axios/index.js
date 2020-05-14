import axios from 'axios'

export default axios.create({
    baseURL: 'http://localhost/100deCilantro/public/api/',
    headers: {
        Authorization: 'Bearer ' + localStorage.access_token
    }
})