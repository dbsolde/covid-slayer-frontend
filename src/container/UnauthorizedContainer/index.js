import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';


const UnauthorizedContainerWrapper = styled.div`
    color: ${props => props.theme.colors.black};
    width: 100%;
    height: 100vh;
`
const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100vh;
    form {
        width: 18.750em;
        margin: 0 auto;
    }
    .formwrapper {
        padding: 3.125em;
        background: ${props => props.theme.colors.white};
        border-radius: 0.625em;
    }
`

class UnauthorizedContainer extends React.PureComponent {

    componentDidMount() {
        // If user still authenticated redirect to home page
        if(this.props.isAuthenticated && this.props.rememberuser) {
            this.props.history.push(`/`)
        }
    }

    render() {
        return (
            <UnauthorizedContainerWrapper>
                <Container>
                    <h1>Welcome to Covid Slayer!</h1>
                    {this.props.children}
                </Container>
            </UnauthorizedContainerWrapper>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    rememberuser: state.auth.rememberuser
})

export default withRouter(connect(mapStateToProps)(UnauthorizedContainer))