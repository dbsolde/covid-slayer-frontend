
const userReducer = (state = [], action) => {
    switch(action.type) {
        case 'REGISTRATION_SUCCESS':
            return {
                ...state,
                ...action.payload,
                error: false
            }
        case 'REGISTRATION_FAILED':
            return {
                ...state,
                error: true,
                ...action.payload
            }
        default: 
            return state
    }
}

export default userReducer