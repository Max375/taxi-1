import  {CHANGE_PHONE, SET_USER_INFO} from '../actions/actionList';


const initialState = {
        token: localStorage.getItem('token')|| null,
};


export default function user(state = initialState, action) {
    switch (action.type) {
        case CHANGE_PHONE: return {
            ...state, phone: action.payload.phone
        };
        case SET_USER_INFO: return{
            ...state, ...action.payload
        };
        default: return state;
    }
}