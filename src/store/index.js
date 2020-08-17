import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer from '../reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const persistConfig = {
    key: 'covidslayer',
    storage: storage,
    whitelist: ['auth']
}

const persistedReducer = persistReducer(persistConfig, rootReducer) 

export default function configureStore (initialState) {
    const middleWare = process.env.NODE_ENV !== 'development'
        ? applyMiddleware(thunk)
        : composeEnhancers(applyMiddleware(thunk))

    return createStore(
        persistedReducer,
        initialState,
        middleWare
    )
}