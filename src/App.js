import React from 'react'
import { Router } from 'react-router'
import { Provider } from 'react-redux'
import configureStore from './store'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
// Import routes
import Routes from './routes'
import { history } from './utils/history'


const store = configureStore()
const persistor = persistStore(store)

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Router history={history}>
                        <Routes history={history} />
                    </Router>
                </PersistGate>
            </Provider>
        )
    }
}