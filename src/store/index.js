import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default function configureStore (initialState) {
    const middleWare = process.env.NODE_ENV !== 'development'
        ? applyMiddleware(thunk)
        : composeEnhancers(applyMiddleware(thunk))

    return createStore(
        rootReducer,
        initialState,
        middleWare
    )
}