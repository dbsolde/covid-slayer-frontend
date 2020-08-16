import api from '../api'
import { saveLocalStorage } from '../utils/localStorage'

export const userAuth = (email, password) => {
    return async dispatch => {
        await api.post('/user/login', {email, password})
        .then(result => {
            console.log(result,'res')
            dispatch({ type: 'LOGIN_SUCCESS', payload: result.data })
            saveLocalStorage('isAuthenticated', true)
            saveLocalStorage('token', result.data.token)
        })
        .catch(err => {
            dispatch({ type: 'LOGIN_FAILED', payload: err.response.data })
        })
    }
}

export const registerUser = (data) => {
    return async dispatch => {
        await api.post('/user/register', data )
        .then( result => {
            console.log(result,'res reg')
            // dispatch({ type: 'REGISTRATION_SUCCESS', payload: result.data })
        })
        .catch(err => {
            // console.log(err.response)
            dispatch({ type: 'REGISTRATION_FAILED', payload: err.response.data })
        })
    }
}