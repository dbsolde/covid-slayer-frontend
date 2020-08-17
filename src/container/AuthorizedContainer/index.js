import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../../components/Header'
import { getUser } from '../../actions/user'

const AuthorizedContainerWrapper = styled.div`
    color: ${props => props.theme.colors.black};
    width: 100%;
    height: auto;
    margin: 0 auto 0;
    header {
        background: ${props => props.theme.colors.headerBG};
    }
`

const InnerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 30px auto 0;
    max-width: 960px;
    h2 {
        margin-bottom: 5px ;
    }
    @media only screen and (max-width: 992px) {
        padding: 10px;
    }
`

class AuthorizedContainer extends React.PureComponent {

    componentDidMount() {
        // Let's get the user details and this will also check if player still authenticated
        this.props.getUser(this.props.userId,this.props.token)

        // if user is not authenticated redirect to login
        if(!this.props.isAuthenticated)
            this.props.history.push(`/login`)
    }

    render() {
        return (
            <AuthorizedContainerWrapper>
                <header>
                    <Header />
                </header>
                <InnerWrapper>
                    {this.props.children}
                </InnerWrapper>
            </AuthorizedContainerWrapper>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    userId: state.auth.userId,
    token: state.auth.token
})

const mapDispatchToProps = dispatch => ({
    getUser: (id,token) => dispatch(getUser(id,token))
})

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(AuthorizedContainer));