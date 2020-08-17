import axios from 'axios'
import { removeLocalStorage } from '../utils/localStorage'

const API_ROOT = process.env.NODE_ENV === 'development' 
    ? 'https://covid-slayer-api.herokuapp.com' 
    : 'https://covid-slayer-api.herokuapp.com'

const createAPI = (token,type) => {
    let headers

    // Form data if upload action :/
    if(type === 'upload') {
        headers = {
            'Content-Type': 'multipart/form-data'
        }
    } else {
    // else let's use application json
        headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    }
    
    let api = axios.create({
        baseURL: API_ROOT,
        responseType: 'json',
        headers
    })
    
    api.interceptors.response.use(function (response) {
        return response
    }, function (error) {
        const { status } = error.response
        // if user current page is login and register
        // let's not validate
        if(window.location.pathname !== "/login" && (status === 401 || status === 403)) {
            // remove localstorage
            removeLocalStorage('persist:covidslayer')

            // redirect to login page
            window.location.href = `/login`
        }      		
        return Promise.reject(error)
    })

    return api
}

const requests = {
    get: (url,token) =>
        createAPI(token)
        .get(url, token),
    post: (url,data,token,type) =>
        createAPI(token,type)
        .post(url, data)
}

const Auth = {
    login: (data) =>
        requests.post('/user/login', data),
    register: (data) => 
        requests.post('/user/register', data, '','upload')
}

const Games = {
    getHistories: (page,perPage,token) =>
        requests.get(`/game/histories/${page}/${perPage}`, token),
    addGameHistory: (data,token) =>
        requests.post('/game/createhistory', data, token)
}

const User = {
    getUser: (id,token) =>
        requests.get(`/user/${id}`, token)
}


export default {
    Auth,
    Games,
    User
}
