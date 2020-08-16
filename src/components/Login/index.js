import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom';
import UnauthorizedContainer from '../../container/UnauthorizedContainer'
import InputText from '../InputText'
import InputCheckbox from '../InputCheckbox'
import Button from '../Button'
import { userAuth } from '../../actions/user'

import { inputValidator } from '../../utils/utils'

const InputGroup  = styled.div`
    margin-bottom: .75rem;
    &.space-between {
        display: flex;
        justify-content: space-between;
    }
    &.align-right {
        display: flex;
        justify-content: flex-end;
    }
`
class Login extends React.Component {

    state = {
        email: '',
        password: '',
        remember: false,
        emailError: '',
        passwordError: '',
        isSubmitted: false
    }

    componentDidUpdate(nextprops) {
        if(this.props.auth.isAuthenticated !== nextprops.auth.isAuthenticated) {
            this.props.history.push('/')
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    
    handleCheck = e  => {
        this.setState({
            [e.target.name]: !this.state.remember
        })
    }

    handleLogin = e => {
        e.preventDefault();
        const { email, password } = this.state

        this.setState({ isSubmitted: true })
        
        // Let's validate fields
        if (!inputValidator('email',email) && !inputValidator('Password',password)) {
            this.setState({ isSubmitted: false })

            this.props.login(email,password)
        }
    }

    render() {
        const {
            email,
            password,
            remember,
            isSubmitted
        } = this.state
        const { auth } = this.props
        
        return (
            <UnauthorizedContainer>
                <div className="formwrapper">
                    <h2>ACCOUNT LOGIN</h2>
                    <form onSubmit={this.handleLogin}>
                        <InputGroup>
                            <InputText 
                                type="text"
                                name="email"
                                label="Email address"
                                placeholder="email@email.com"
                                value={email}
                                errorMessage={isSubmitted ? inputValidator('email',email) : ''}
                                handleChange={(e) => this.handleChange(e)} />
                        </InputGroup>
                        <InputGroup>
                            <InputText 
                                type="password"
                                name="password"
                                label="Password"
                                placeholder="*********"
                                value={password}
                                errorMessage={isSubmitted ? inputValidator('Password',password) : ''}
                                handleChange={(e) => this.handleChange(e)} />
                        </InputGroup>
                        <InputGroup className="space-between">
                            <InputCheckbox 
                                label="Remember me"
                                name="remember"
                                value={remember}
                                handleChange={this.handleCheck} />
                            <span>
                                <Link to='/register'>Create an Account</Link>
                            </span>
                        </InputGroup>

                        {auth.error && <p className="error-message">{auth.message}</p>}

                        <InputGroup className="align-right">
                            <Button btnStyle="primary" disabled={false}>Login</Button>
                        </InputGroup>
                    </form>
                </div>
            </UnauthorizedContainer>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

const mapDispatchToProps = dispatch => ({
    login: (email,password) => dispatch(userAuth(email,password))
})

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Login))