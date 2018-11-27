import {CHANGE_PHONE, SET_USER_INFO, CLEAR_TOKEN_ACTION} from '../actions/actionList';


const initialState = {
        token: localStorage.getItem('token')|| null,
        bonus: 0,
        distance: 0,
        image: './',
        name: '',
        numTrip: 0,
        phone: null,
        promocode: null,
};


export default function user(state = initialState, action) {
    switch (action.type) {
        case CHANGE_PHONE: return {
            ...state, phone: action.payload.phone
        };
        case SET_USER_INFO: {
            if (action.payload.token !== null && action.payload.token !== undefined) localStorage.setItem('token',action.payload.token);
            return {
                ...state, ...action.payload
            };
        }
        case CLEAR_TOKEN_ACTION:
            localStorage.removeItem('token');
            console.log('clear_token');
            return initialState;
        default: return state;
    }
}