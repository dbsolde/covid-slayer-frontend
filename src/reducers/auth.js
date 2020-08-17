
const initialState = {
    isAuthenticated: false,
    rememberuser: false
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'LOGIN_REQUEST':
            return {
                ...state,
                error: false,
                loading: true,
                rememberuser: action.payload
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
                userId: action.payload.userId,
                token: action.payload.token
            }
        default: 
            return state
    }
}

export default authReducer