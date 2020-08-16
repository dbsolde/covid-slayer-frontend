import { combineReducers } from 'redux'
import auth from './auth'
import user from './user'
import game from './game'
import gamehistory from './gamehistory'
import modal from './modal'

const rootReducer = combineReducers({
    auth,
    user,
    game,
    gamehistory,
    modal
})

export default rootReducer