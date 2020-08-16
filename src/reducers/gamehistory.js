
// const initialState = {
//     data: [
//         { 
//             id: 1,
//             status: 'Won', // Can be Won, Defeated, Surrender/Give up,
//             time: 50,
//             player: 5,
//             opponent: 0
//         },
//         { 
//             id: 2,
//             status: 'Give Up', // Can be Won, Defeated, Surrender/Give up, 
//             time: 50,
//             player: 15,
//             opponent: 25
//         },
//         { 
//             id: 3,
//             status: 'Defeated', // Can be Won, Defeated, Surrender/Give up, 
//             time: 40,
//             player: 0,
//             opponent: 25
//         }
//     ]
// }

const gameHistoryReducer = (state = [], action) => {
    switch(action.type) {
        case 'GET_GAME_HISTORY_SUCCESS':
            return {
                ...state,
                data: action.payload
            }
        case 'GET_GAME_HISTORY_FAILED':
            return {
                ...state,
                error: true,
                message: action.payload
            }
        default: 
            return state
    }
}

export default gameHistoryReducer