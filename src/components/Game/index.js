import React from 'react';
import { connect } from 'react-redux'
import AuthorizedContainer from '../../container/AuthorizedContainer'
import styled from 'styled-components'
import Player from '../Player'
import Button from '../Button';
import { withRouter } from 'react-router-dom';
import {
    playerGive,
    startGame,
    actionAttack,
    actionHeal,
    actionSetWinner
} from '../../actions/games'
import { showModal, hideModal } from '../../actions/modal'
import Modal from '../Modal'
import { randomNum } from '../../utils/utils'

const Content = styled.div`
    display: flex;
    flex-direction: row;
    background: ${props => props.theme.colors.white};
    padding: 10px;
    border-radius: 0.313em;
    justify-content: space-between;
    .commentary {
        width: 35%;
        ul {
            list-style: none;
            margin: 0;
            padding: 0;
            height: 220px;
            overflow-y: scroll;
            li {
                background: #ddd;
                padding: 3px;
                margin-bottom: 2px;
            }
        }
    }
    .game {
        width: 62%;
    }

    @media only screen and (max-width: 992px) {
        padding: 20px 0px;
        flex-direction: column;
        .game {
            width: 100%;
        }
        .commentary {
            width: 100%;
            padding: 10px;
        }
    }
`


class Game extends React.PureComponent {

    state = {
        confirmLeave: false
    }

    componentDidMount() {
        // insert new game record
        this.props.startGame()

        // Block when player try to leave the page. It will be considered as give up
        this.blockPlayer = this.props.history.block(targetLocation => {
            // console.log(targetLocation,'targetLocation')
            // this.props.history.push(`${targetLocation.pathname}`)
            this.props.showModal({ title: `Give Up`, message: 'Are you sure you want to leave the game? This will be considered as give up', type: 'giveup' })
            this.setState({ confirmLeave: true })
            return this.state.confirmLeave
       });
    }

    componentWillUnmount() {
        this.closeModal()
        this.blockPlayer()
    }

    /**
     * Player normal attack action
     * @param {Object} player 
     * @param {Object} opponent 
     */
    attack = (player, opponent) => {               
        const attackHit = randomNum(0,9)

        // Get covid monster health subtract to hit
        const opponentDamagedHealth = opponent.opponentHealth - attackHit
        
        if(opponentDamagedHealth < 0 || opponentDamagedHealth === 0) {
            // Let's set play won the game
            this.props.actionSetWinner('player')
            this.props.showModal({ title: `${player.playerName} won!`, message: 'Yay you beat the covid monster! Congrats. Play again?', type: 'endgame'})

            // Save details later for game history
        } else {
            this.props.actionAttack(opponentDamagedHealth,`${player.playerName} Attack the ${opponent.opponentName} by ${attackHit}`,'player')
        }

        // Monster turn to attack
        this.opponentAttack('attack','',player)
    }

    /**
     * Player blast action
     * @param {Object} player 
     * @param {Object} opponent 
     */
    blast = (player, opponent) => {
        // const { opponent } = this.props
        const powerAttack = randomNum(9,19)
        
        // Get covid monster health subtract to hit
        const opponentDamagedHealth = opponent.opponentHealth - powerAttack
        
        if(opponentDamagedHealth < 0 || opponentDamagedHealth === 0) {
            // Let's set play won the game
            this.props.actionSetWinner('player')
            this.props.showModal({ title: `${player.playerName} won!`, message: 'Yay you beat the covid monster! Congrats. Play again?', type: 'endgame'})

            // Save details later for game history
        } else {
            this.props.actionAttack(opponentDamagedHealth,`${player.playerName} Attack the ${opponent.opponentName} by ${powerAttack}`,'player')
        }

        // Monster turn to attack
        this.opponentAttack('blast','',player)
    }

    /**
     * Player heal action
     * @param {Object} player 
     */
    heal = (player) => {
        const healPlayer = randomNum(0,9)

        // Heal the player's health
        const playerHealHealth = player.playerHealth + healPlayer

        // Let's heal the player
        this.props.actionHeal(playerHealHealth,`${player.playerName} heal by ${healPlayer}`)

        // But the monster can still attack :/
        this.opponentAttack('heal',playerHealHealth,player)
    }

    /**
     * Opponent or Covid Monster attack function
     * @param {String} type: Covid monster type of actions to attack
     * @param {Number} health: this is on if the player actions is heal
     * @param {Object} player: player records
     */
    opponentAttack = (type,health,player) => {
        const { isGameStarted } = this.props

        // If the player doing "heal"
        // lets get the updated health of the player
        const newHealth = type === 'heal' ? health : player.playerHealth

        // If attack is from blast/special let's increase the damage
        const attackHit = type === 'blast' ? randomNum(9,19) : randomNum(0,9)

        const playerDamagedHealth = newHealth - attackHit

        if(playerDamagedHealth < 0 || playerDamagedHealth === 0) {
            // Let's set covid monster won the game
            this.props.actionSetWinner('opponent')
            this.props.showModal({ title: `Covid Monster won!`, message: 'Yay Covid Monster beat you! Sad. Play again?', type: 'endgame' })

            // Save details later for game history
        } else if(isGameStarted) {
            this.props.actionAttack(playerDamagedHealth,`Covid Monster Attack ${player.playerName} by ${attackHit}`,'opponent')
        }
    }

    giveUp = () => {
        this.setState({ confirmLeave: true })
        this.props.showModal({ title: `Give Up`, message: 'Are you sure you want to surrender to the Covid Monster?', type: 'giveup' })
    }

    confirmGiveUp = () => {
        this.props.playerGive()
        this.closeModal()
        this.props.history.push('/')       
        // Save details later for game history
    }

    closeModal = () => this.props.hideModal()

    playAgain = () => {
        this.props.startGame()
        this.closeModal()
    }

    leaveTheGame = () => {
        this.closeModal()
        this.props.history.push('/')
        this.setState({ confirmLeave: true })
    }

    render() {
        const {
            modalProps,
            player,
            opponent,
            logs
        } = this.props

        return (
            <AuthorizedContainer>
                <h2>In Game</h2>
                <Content>
                    <div className="row column game">
                        <div className="row space-between">
                            <Player 
                                playerName={player.playerName}
                                health={player.playerHealth} />
                            <span className='vs'>VS</span>
                            <Player 
                                playerName={opponent.opponentName}
                                health={opponent.opponentHealth} />
                        </div>
                        <div className="row center column">
                            <h2>Game Actions</h2>
                            <div className="row center">
                                {/* Normal attack */}
                                <Button 
                                    btnStyle="primary" 
                                    handleClick={() => this.attack(player,opponent)}>ATTACK</Button>
                                {/* Special attack */}
                                <Button 
                                    btnStyle="warning" 
                                    handleClick={() => this.blast(player,opponent)}>BLAST</Button>
                                {/* Disabled if player and opponent still has perfect health */}
                                <Button 
                                    btnStyle="success" 
                                    disabled={player.playerHealth === 100 && opponent.opponentHealth === 100} 
                                    handleClick={() => this.heal(player)}>HEAL</Button>
                                {/* Give up */}
                                <Button btnStyle="danger" handleClick={this.giveUp}>GIVE UP</Button>
                            </div>
                        </div>
                    </div>
                    <div className="commentary">
                        <h3>Commentary</h3>
                        <ul className="logger">
                            {logs && 
                            logs
                            .map( (item,idx) => {
                                return <li key={idx}><span>{item}</span></li>
                            })} 
                            {/* slice(0, 10) */}
                        </ul>
                    </div>
                </Content>
                
                {modalProps.type === 'endgame' &&
                    <Modal onClose={this.closeModal} onConfirm={this.playAgain} onLeave={this.leaveTheGame}>
                        <p>{modalProps.message}</p>
                    </Modal>
                }
                {modalProps.type === 'giveup' &&
                    <Modal onClose={this.closeModal} onConfirm={this.confirmGiveUp} >
                        <p>{modalProps.message}</p>
                    </Modal>
                }
            </AuthorizedContainer>
        )
    }
}

const mapStateToProps = state => ({
    isGameStarted: state.game.isGameStarted,
    modalProps: state.modal.modalProps,
    player: state.game.player,
    opponent: state.game.opponent,
    logs: state.game.commentary,
    playerWon: state.game.playerWon
})

const mapDispatchToProps = dispatch => ({
    playerGive: () => dispatch(playerGive()),
    startGame: () => dispatch(startGame()),
    hideModal: () => dispatch(hideModal()),
    actionAttack: (damage,message,attackTurn) => dispatch(actionAttack(damage,message,attackTurn)),
    actionHeal: (health,message) => dispatch(actionHeal(health,message)),
    actionSetWinner: (type) => dispatch(actionSetWinner(type)),
    showModal: (modalProps) => dispatch(showModal(modalProps))
})

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Game))