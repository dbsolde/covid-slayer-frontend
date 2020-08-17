import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { logout } from '../../actions/user'

const HeaderWrapper = styled.div`
    max-width: 1140px;
    margin: 0 auto;   
    padding: 10px;
    color: ${props => props.theme.colors.white};
    display: flex;
    align-items: center;
    justify-content: space-between;
    .brand {
        font-size: 50px;
    }
    @media only screen and (max-width: 992px) {
        flex-direction: column;
        ul {
            margin-top: 20px;
        }
    }
`
const Nav = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    li {        
        a {
            color: ${props => props.theme.colors.white};                
            text-transform: uppercase;
            font-weight: 700;
            letter-spacing: 2px;
            padding: 5px 15px;
            :hover {
                text-decoration: underline;
            }
        }
    }
`

const Header = (props) => {
    return (
        <HeaderWrapper>
            <div className="brand">
                <span>Covid Slayer</span>
            </div>

            <Nav>
                <li>
                    <Link to="/">Play</Link>
                </li>
                <li>    
                    <Link to="/game-history">Game History</Link>
                </li>
                <li>
                    <Link to="/logout" onClick={() => props.logout()}>Logout</Link>
                </li>
            </Nav>
        </HeaderWrapper>
    )
}

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout())
})

export default connect(null,mapDispatchToProps)(Header)