
export const showModal = (modalProps) => {
    return dispatch => {
        dispatch({ type: 'SHOW_MODAL', payload: modalProps })
    }
}
 
export const hideModal = (modal = '') => {
    return dispatch => {
        dispatch({ type: 'HIDE_MODAL' })
    }
}
