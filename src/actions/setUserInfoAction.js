import {SET_USER_INFO} from "./actionList";

export default function setUserInfoAction(data) {
   let action =  {
        type: SET_USER_INFO,
        payload:{
            name: data.name,
            phone: data.phone,
            image: data.image,
            email: data.email,
            bonus: data.bonus,
            numTrip: data.numTrip,
            distance: data.distance,
            promocode: data.promocode,
        }
    };

   if (data.token !== undefined && data.token !== null) action.payload.token = data.token;

    return action;
}