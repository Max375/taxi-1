import  {CHANGE_PHONE, SET_USER_INFO, SET_DEVICE_ID} from '../actions/actionList';


const initialState = {
        token: localStorage.getItem('token')|| null,
        deviceId: null,
};


export default function user(state = initialState, action) {
    switch (action.type) {
        case CHANGE_PHONE: return {
            ...state, phone: action.payload.phone
        };
        case SET_USER_INFO: {
            if (action.payload.token) localStorage.setItem('token', action.payload.token);
            return {
                ...state, ...action.payload
            };
        }
        case SET_DEVICE_ID: return{
            ...state, deviceId: action.payload.deviceId
        };
        default: return state;
    }
}