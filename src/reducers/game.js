
const initialState = {
    gameTime: 60, // Game time 60secs by default
    opponent: {
        opponentHealth: 100,
        opponentName: 'Covid Monster'
    }, // Opponent default health and name
    player: {
        playerHealth: 100,
        playerName: 'Dennis'
    }, // Player default health and name
    isGameStarted: false, 
    commentary: [], // Actions logs
    playerGiveUp: false,
    winner: '',
    isPlayerWon: false,
    isOpponentWon: false,
    actions: {
        playerAttack: false,
        playerBlast: false,
        playerHeal: false,
        playerGiveUp: false
    }
}

const gameReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'START_GAME':
            return {
                ...initialState,
                isGameStarted: true,
            }
        case 'PLAYER_ATTACKED':
            return {
                ...state,
                opponent:  {
                    ...state.opponent,
                    opponentHealth: action.payload.damage
                },
                commentary: [ ...state.commentary, action.payload.message]
            }
        case 'OPPONENT_ATTACKED':
            return {
                ...state,
                player:  {
                    ...state.player,
                    playerHealth: action.payload.damage
                },
                commentary: [ ...state.commentary, action.payload.message]
            }
        case 'PLAYER_HEAL':
            return {
                ...state,
                player:  {
                    ...state.player,
                    playerHealth: action.payload.heal
                },
                commentary: [ ...state.commentary, action.payload.message]
            }
        case 'PLAYER_GIVE_UP':
            return {
                ...state,
                actions: {
                    ...state.actions,
                    playerGiveUp: true
                },
                isGameStarted: false,
                opponent:  {
                    ...state.opponent,
                    opponentHealth: 100
                },
                player: {
                    ...state.player,
                    playerHealth: 100
                },
                isOpponentWon: true,
                commentary: []
            }
        case 'SET_WINNER':
            // If the player won
            if(action.payload.type === 'player') {
                return {
                    ...state,
                    opponent: {
                        ...state.opponent,
                        opponentHealth: 0
                    },
                    isPlayerWon: true
                }
            } else {
                return {
                    ...state,
                    player: {
                        ...state.player,
                        playerHealth: 0
                    },
                    isOpponentWon: true
                }
            }
        default: 
            return state
    }
}

export default gameReducer