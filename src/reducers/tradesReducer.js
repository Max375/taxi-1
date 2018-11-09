import {SET_TRADES, CLEAR_TRADES} from '../actions/tradesAction/tradesActions';


const initialState = {
    trades: []
};


export default function trade(state = initialState, action) {
    switch (action.type) {
        case SET_TRADES: return {
            ...state, trades: action.payload.trades
        };
        case CLEAR_TRADES: {
            return initialState;
        }
        default: return state;
    }
}