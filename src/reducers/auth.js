import { getLocalStorage } from '../utils/localStorage'

const initialState = {
    isAuthenticated: getLocalStorage('isAuthenticated') ? getLocalStorage('isAuthenticated') : false,
    token: getLocalStorage('token') ? getLocalStorage('token') : ''
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'LOGIN_REQUEST':
            return {
                ...state,
                error: false,
                loading: true
            }
        case 'LOGIN_FAILED':
            return {
                ...state,
                error: true,
                loading: false,
                ...action.payload
            }
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                error: false,
                loading: false,
                isAuthenticated: true,
                ...action.payload
            }
        default: 
            return state
    }
}

export default authReducer