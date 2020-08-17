
const userReducer = (state = [], action) => {
    switch(action.type) {
        case 'REGISTRATION':
            return {
                ...state,
                success: false,
                registrationLoading: true
            }
        case 'REGISTRATION_SUCCESS':
            return {
                ...state,
                ...action.payload,
                success: true,
                error: false,
                registrationLoading: false
            }
        case 'REGISTRATION_FAILED':
            return {
                ...state,
                error: true,
                success: false,
                registrationLoading: false,
                ...action.payload
            }
        case 'GET_USER_REQUEST':
            return {
                ...state,
                userLoading: true
            }
        case 'GET_USER_SUCCESS':
            return {
                ...state,
                userLoading: false,
                name: action.payload.user.name,
                email: action.payload.user.email,
                avatarImage: action.payload.user.avatarImage,
            }
        case 'GET_USER_FAILED':
            return {
                ...state,
                errorFetchUser: true,
                userLoading: false,
                ...action.payload
            }
        default: 
            return state
    }
}

export default userReducer