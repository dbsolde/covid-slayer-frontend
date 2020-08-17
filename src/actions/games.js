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

export const playerGiveUp = () => {
    return dispatch => {
        dispatch({ type: 'PLAYER_GIVE_UP' })
    }
}

export const actionSetWinner = (type) => {
    return dispatch => {
        dispatch({ type: 'SET_WINNER', payload: { type } })
    }
}

export const setGameTime = (time) => {
    return dispatch => {
        dispatch({ type: 'SET_GAME_TIME', payload: { time }})
    }
}

export const resetGame = () => {
    return dispatch => {
        dispatch({ type: 'RESET_GAME' })
    }
}

export const getHistories = (page,perPage,token) => {
    return async dispatch => {
        dispatch({ type: 'GET_GAME_HISTORY' })
        await api.Games.getHistories(page,perPage,token)
        .then(result => {
            dispatch({ type: 'GET_GAME_HISTORY_SUCCESS', payload: result.data})
        })
        .catch(err => {
            dispatch({ type: 'GET_GAME_HISTORY_FAILED', payload: err })
        })
    }
}

export const saveGame = (data,token) => {
    return async dispatch => {
        await api.Games.addGameHistory(data, token)
        .then(result => {
            dispatch({ type: 'ADD_GAME_HISTORY_SUCCESS' })
        })
        .catch(err => {
            dispatch({ type: 'ADD_GAME_HISTORY_FAILED', payload: err })
        })
    }
}