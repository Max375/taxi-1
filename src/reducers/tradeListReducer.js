import  {SET_TRADE_LIST} from '../actions/actionList';


const initialState = {
    orders: null
};


export default function user(state = initialState, action) {
    switch (action.type) {
        case SET_TRADE_LIST: return {
            ...state, orders: action.payload.orders
        };
    }
}