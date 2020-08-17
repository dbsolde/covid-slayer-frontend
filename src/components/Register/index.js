import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import UnauthorizedContainer from '../../container/UnauthorizedContainer'
import InputText from '../InputText'
import Button from '../Button'
import { registerUser } from '../../actions/user'
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

class Register extends React.PureComponent {

    state = {
        name: '',
        email: '',
        password: '',
        avatarImage: ''
    }

    handleChange = e => {
        if(e.target.name === 'avatarImage') {
            this.setState({ avatarImage: e.target.files[0] }); 
        } else {
            this.setState({
                [e.target.name]: e.target.value
            })
        }
    }

    handleRegistration = e => {
        e.preventDefault();
        const { name, email, password, avatarImage } = this.state
        
        this.setState({ isSubmitted: true })        

        // Let's validate fields
        if (!inputValidator('Name',name) && !inputValidator('email',email) && !inputValidator('Password',password) && !inputValidator('File',avatarImage)) {
            this.setState({ isSubmitted: false })

            this.props.registerUser({ name, email, password, avatarImage })
        }
    }

    render() {
        const {
            name,
            email,
            password,
            avatarImage,
            isSubmitted
        } = this.state
        const { user } = this.props

        return (
            <UnauthorizedContainer>
                <div className="formwrapper">
                    <h2>CREATE AN ACCOUNT</h2>
                    <form onSubmit={this.handleRegistration}>
                        <InputGroup>
                            <InputText 
                                type="text"
                                name="name"
                                label="Full Name"
                                placeholder="First Name"
                                value={name}
                                errorMessage={isSubmitted ? inputValidator('Name',name) : ''}
                                handleChange={(e) => this.handleChange(e)} />
                        </InputGroup>
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

                        <InputGroup>
                            <InputText 
                                type="file"
                                name="avatarImage"
                                label="Avatar"
                                errorMessage={isSubmitted ? inputValidator('File',avatarImage) : ''}
                                handleChange={(e) => this.handleChange(e)} />
                        </InputGroup>

                        {user.error && <p className="error-message">{user.message}</p>}
                        {user.success && <p className="success-message">{user.message}</p>}

                        <InputGroup className="align-right">
                            <Button btnStyle="success" disabled={user.registrationLoading}>Create Account</Button>
                        </InputGroup>
                        <InputGroup >
                            <span>
                                <Link to='/login'>Sign In</Link>
                            </span>
                        </InputGroup>
                    </form>
                </div>
            </UnauthorizedContainer>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user
})

const mapDispatchToProps = dispatch => ({
    registerUser: (data) => dispatch(registerUser(data))
})
export default connect(mapStateToProps,mapDispatchToProps)(Register)