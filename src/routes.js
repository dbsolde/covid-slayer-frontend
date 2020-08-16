import React from 'react'
import { Router, Switch, Route, BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import GlobalStyles from './styles/global'
import { theme } from './styles/theme'

// Import views
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import GameHistory from './components/GameHistory'
import Game from './components/Game'

class Routes extends React.Component {
    render() {
        const { history } = this.props
        return (
            <Router history={history}>
                <BrowserRouter>
                    <ThemeProvider theme={theme}>
                        <GlobalStyles />
                        <Switch>
                            <Route path={`/`}  exact component={Dashboard} />
                            <Route path={`/game`}  exact component={Game} />
                            <Route path={`/game-history`}  exact component={GameHistory} />
                            <Route path={`/login`}  exact component={Login} />
                            <Route path={`/register`}  exact component={Register} />
                        </Switch>                  
                    </ThemeProvider>
                </BrowserRouter>
            </Router>
        )
    }
}

export default Routes