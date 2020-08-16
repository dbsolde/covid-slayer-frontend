import React from 'react';
import { connect } from 'react-redux'
import AuthorizedContainer from '../../container/AuthorizedContainer'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import Player from '../Player'

const Content = styled.div`
    display: flex;
    flex-direction: column;
    background: ${props => props.theme.colors.white};
    padding: 20px;
    border-radius: 0.313em;

    @media only screen and (max-width: 992px) {
        padding: 20px 0px;
    }
`
const LinkBtn = styled.div`
    a {
        padding: .75rem 2rem;
        border: 0;
        border-radius: 0.188em;
        cursor: pointer;
        font-size: 0.875em;
        background: ${props => props.theme.colors.primary.background};
        color: ${props => props.theme.colors.primary.color};
        :hover {
            background: ${props => props.theme.colors.primary.hover};
        }
    }
`
class Dashboard extends React.PureComponent {

    

    render() {
        const {
            player,
            opponent
        } = this.props

        return (
            <AuthorizedContainer>
                <h2>Play</h2>
                <Content>
                    <div className="row">
                        <Player 
                            playerName={player.playerName}
                            health={player.playerHealth} />
                        <Player 
                            playerName={opponent.opponentName}
                            health={opponent.opponentHealth} />
                    </div>
                    <LinkBtn className="row center">
                        <Link to="/game">Start Game</Link>
                    </LinkBtn>
                </Content>
            </AuthorizedContainer>
        )
    }
}

const mapStateToProps = state => ({
    player: state.game.player,
    opponent: state.game.opponent
})

export default connect(mapStateToProps)(Dashboard)