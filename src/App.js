import React from 'react'
import { Router } from 'react-router'
import { Provider } from 'react-redux'
import configureStore from './store'
// Import routes
import Routes from './routes'
import { history } from './utils/history'


const store = configureStore()

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <Routes history={history} />
                </Router>
            </Provider>
        )
    }
}