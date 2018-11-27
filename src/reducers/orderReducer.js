import {
    SET_ORDER_START_POINT,
    SET_ORDER_END_POINT,
    SET_ORDER_PRICE,
    SET_ORDER,
    SET_ORDER_COMMENT,
    SET_ORDER_ENTRANCE,
    REMOVE_ORDER,
    SET_ORDER_OPTIONS,
    SET_ORDER_WAY_POINT,
    ADD_ORDER_WAY_POINT,
    REMOVE_ORDER_WAY_POINT,
    SET_ORDER_CAR_TYPE,
    SET_CARD_ID
} from '../actions/ordersActions/orderActions';

const initialState = {
    id: null,
    endPoint: {address: null, location: null},
    wayPoint: null,
    startPoint: {address: null, location: null},
    price: 0,
    entrance: 0,
    status: null,
    comment: '',
    card: 0,
    options: {
        smoking : 0,
        gender : 0,
        english : 0,
        babySeat : 0,
        dogPlace : 0,
        numberSeats : 3,
        carType : 1,
        terminal : 0,
        ads : 0,
        baggage : 0
    }
};


export default function order(state = initialState , action) {
    switch (action.type) {

        case ADD_ORDER_WAY_POINT: {
            return{
                ...state,
                wayPoint:  {address: null, location: null},
            };
        }

        case REMOVE_ORDER_WAY_POINT: {
            return{
                ...state,
                wayPoint:  null
            };
        }

        case SET_ORDER_END_POINT:
            return{
                ...state,
                endPoint: action.payload.endPoint
            };
        case SET_ORDER_WAY_POINT:
            return{
                ...state,
                wayPoint: action.payload.wayPoint
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
        case SET_ORDER_CAR_TYPE: {
            return{
                ...state,
                options: {
                    ...state.options,
                    carType: action.payload.carType
                }
            }
        }
        case SET_CARD_ID:{
            return{
                ...state,
                card: action.payload.id
            }
        }
        default:
            return state;
    }
}