import axios from 'axios'
import { getLocalStorage, removeLocalStorage } from '../utils/localStorage'

// localhost:5000/game/histories
const API_ROOT = 'http://localhost:3001'

let api = axios.create({
    baseURL: API_ROOT,
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getLocalStorage('token')}`
    }
})

api.interceptors.response.use(function (response) {
    return response
}, function (error) {
    const { status, data } = error.response
    // if(window.location !== "/login" && (status === 401 || status === 403)) {
    //     // redirect to login page
    //     window.location.href = `/login`
    //     console.log(status,data,window.location,'dasda')
    //     removeLocalStorage('token')
    //     removeLocalStorage('isAuthenticated')
    // }      		
    return Promise.reject(error)
})


export default api
