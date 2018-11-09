import {
    SET_ORDER_START_POINT,
    SET_ORDER_END_POINT,
    SET_ORDER_PRICE,
    SET_ORDER,
    SET_ORDER_COMMENT,
    SET_ORDER_ENTRANCE,
    REMOVE_ORDER,
    ADD_ORDER_END_POINT, SET_ORDER_OPTIONS
} from '../actions/ordersActions/orderActions';

const initialState = {
    id: null,
    endPoints: [{address: null, location: null}],
    startPoint: {address: null, location: null},
    price: 0,
    entrance: 0,
    status: null,
    comment: '',
    options: {
        smoking : 0,
        gender : 0,
        english : 0,
        babySeat : 0,
        dogPlace : 0,
        numberSeats : 3,
        carType : 4,
        terminal : 0,
        ads : 0,
        baggage : 0
    }
};


export default function order(state = initialState , action) {
    switch (action.type) {
        case SET_ORDER_END_POINT:

            const endPoints = state.endPoints;
            endPoints[action.payload.index] = action.payload.endPoint;

            return{
                ...state,
                endPoints: endPoints
            };
        case ADD_ORDER_END_POINT:
            return{
                ...state,
                endPoints: [...state.endPoints, {address: null, location: null}]
            };
        case SET_ORDER_START_POINT:
            return{
                ...state,
                startPoint: action.payload.startPoint
            };
        case SET_ORDER_PRICE:
            return{
                ...state,
                price: action.payload.price
            };
        case SET_ORDER:
            if (action.payload === null) return initialState;
            return{
                ...action.payload
            };
        case SET_ORDER_ENTRANCE:
            return{
                ...state,
                entrance: action.payload.entrance
            };
        case SET_ORDER_COMMENT:
            return{
                ...state,
                comment: action.payload.comment
            };
        case REMOVE_ORDER: {
             return initialState;
         }
        case SET_ORDER_OPTIONS: {
             return{
                 ...state,
                 options: {
                     ...action.payload
                 }
             }
        }
        default:
            return state;
    }
}