
const initialState = {
    modalProps: {},
    isOpen: false
}

const modalReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SHOW_MODAL':
            return {
                ...state,
                isOpen: true,
                modalProps: action.payload
            }
        case 'HIDE_MODAL':
            return initialState
        default:
            return state
    }
}

export default modalReducer