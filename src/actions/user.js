import api from '../api'
import { removeLocalStorage } from '../utils/localStorage'

export const userAuth = (email, password, remember) => {
    return async dispatch => {
        dispatch({ type: 'LOGIN_REQUEST', payload: remember })
        await api.Auth.login({email, password})
        .then(result => {
            dispatch({ type: 'LOGIN_SUCCESS', payload: result.data })
        })
        .catch(err => {
            dispatch({ type: 'LOGIN_FAILED', payload: err.response.data })
        })
    }
}

export const registerUser = (data) => {
    return async dispatch => {

        /** Create post request form */
        let formData = new FormData();
        formData.append('name', data.name)
        formData.append('email', data.email)
        formData.append('avatar', data.avatarImage)
        formData.append('password', data.password)

        dispatch({ type: 'REGISTRATION' })

        await api.Auth.register(formData)
        .then( result => {
            dispatch({ type: 'REGISTRATION_SUCCESS', payload: result.data })
        })
        .catch(err => {
            dispatch({ type: 'REGISTRATION_FAILED', payload: err.response.data })
        })
    }
}

export const getUser = (id,token) => {
    return async dispatch => {
        dispatch({ type: 'GET_USER_REQUEST' })
        await api.User.getUser(id,token)
        .then( result => {
            dispatch({ type: 'GET_USER_SUCCESS', payload: result.data })
        })
        .catch(err => {
            dispatch({ type: 'GET_USER_FAILED', payload: err.response.data })
        })
    }
}


export const logout = () => {
    return async dispatch => {
        dispatch({ type: 'LOGOUT' })
        // lets clear localstorage on logout
        removeLocalStorage('persist:covidslayer')
        // redirect user to login
        window.location.href = `/login`
    }
}