import React from 'react';
import styled from 'styled-components';


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
        background: #FFFFFF;
        border-radius: 0.625em;
    }
`

class UnauthorizedContainer extends React.PureComponent {
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

export default UnauthorizedContainer