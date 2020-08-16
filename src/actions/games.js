import api from '../api'

export const startGame = () => {
    return dispatch => {
        dispatch({ type: 'START_GAME' })
    }
}

export const actionAttack = (damage,message,attackTurn) => {
    return dispatch => {
        if(attackTurn === 'player') {
            dispatch({ type: 'PLAYER_ATTACKED', payload: { damage, message, attackTurn } })
        } else {
            dispatch({ type: 'OPPONENT_ATTACKED', payload: { damage, message, attackTurn } })
        }
    }
}

export const actionBlast = () => {
    return dispatch => {
        dispatch({ type: 'PLAYER_BLAST' })
    }
}

export const actionHeal = (heal,message) => {
    return dispatch => {
        dispatch({ type: 'PLAYER_HEAL', payload: { heal, message } })
    }
}

export const playerGive = () => {
    return dispatch => {
        dispatch({ type: 'PLAYER_GIVE_UP' })

        // Let's open the modal if player surrender
        // dispatch({ type: 'SHOW_MODAL', payload: { title: 'Give Up', message: 'You Weak! Disgusting!', save: true } })
    }
}

export const actionSetWinner = (type) => {
    return dispatch => {
        dispatch({ type: 'SET_WINNER', payload: { type } })
    }
}

export const getHistories = (type) => {
    return async dispatch => {
        await api.get('/game/histories')
        .then(result => {
            // console.log(result.data,'res')
            dispatch({ type: 'GET_GAME_HISTORY_SUCCESS', payload: result.data.histories})
        })
        .catch(err => {
            dispatch({ type: 'GET_GAME_HISTORY_FAILED', payload: err })
        })
    }
}