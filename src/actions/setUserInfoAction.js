import {SET_USER_INFO} from  "./actionList";

export default function userLoginAction(data) {
    return{
        type: SET_USER_INFO,
        payload:{
            token: data.token,
            bonus: data.user_info.bonus,
            distance: data.user_info.distance,
            image: data.user_info.image,
            name: data.user_info.name,
            num_trip: data.user_info.num_trip,
        }
    }
}