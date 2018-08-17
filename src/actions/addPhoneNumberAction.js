import {CHANGE_PHONE} from  "./actionList";

export default function userLoginAction(phone) {
    return{
        type: CHANGE_PHONE,
        payload:{
            phone: phone
        }
    }
}