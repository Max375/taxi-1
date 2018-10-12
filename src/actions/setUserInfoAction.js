import {SET_USER_INFO} from  "./actionList";

export default function userLoginAction(data,token) {
    return{
        type: SET_USER_INFO,
        payload:{
            token: token,
            bonus: data.bonus,
            distance: data.distance,
            image: data.image,
            name: data.name,
            num_trip: data.num_trip,
            phone: data.phone,
            promocode: data.promocode
        }
    }
}