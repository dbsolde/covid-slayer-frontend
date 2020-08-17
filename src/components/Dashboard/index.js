import React from 'react';
import { connect } from 'react-redux'
import AuthorizedContainer from '../../container/AuthorizedContainer'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import Player from '../Player'
import InputText from '../InputText'
import Button from '../Button'
import { setGameTime } from '../../actions/games'

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

    state = {
        gameTime: 60
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    startGame = () => {
        this.props.setGameTime(this.state.gameTime)
        // redirect to game
        this.props.history.push('/game')
    }


    render() {
        const {
            player,
            opponent,
            user
        } = this.props
        const { gameTime } = this.state

        return (
            <AuthorizedContainer>
                <h2>Play</h2>
                <Content>
                    <div className="row">
                        <Player 
                            playerName={player.playerName}
                            health={100} 
                            avatarImage={player.avatar} />
                        <Player 
                            playerName={opponent.opponentName}
                            health={opponent.opponentHealth} 
                            avatarImage={opponent.avatar}/>
                    </div>
                    <LinkBtn className="row center">

                        <InputText 
                            type="number"
                            name="gameTime"
                            label="Set game time"
                            value={gameTime}
                            handleChange={(e) => this.handleChange(e)} />
                        <Button 
                            btnStyle="primary" 
                            handleClick={this.startGame}
                            disabled={user.userLoading}>Start Game</Button>
                        {/* <Link to="/game">Start Game</Link> */}
                    </LinkBtn>
                </Content>
            </AuthorizedContainer>
        )
    }
}

const mapStateToProps = state => ({
    player: state.game.player,
    opponent: state.game.opponent,
    user: state.user
})

const mapDispatchToProps = dispatch => ({
    setGameTime: (time) => dispatch(setGameTime(time))
})
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Dashboard))