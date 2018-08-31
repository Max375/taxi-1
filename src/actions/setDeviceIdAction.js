import {CHANGE_SCREEN, SET_DEVICE_ID} from './actionList';

export default function setDeviceIdAction(id) {
    return{
        type: SET_DEVICE_ID,
        payload:{
            deviceId: id
        },
    }
}