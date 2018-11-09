import {SET_ORDER_OPTIONS} from './orderActions';

export default function setOrderOptionsAction(options) {
    return{
        type: SET_ORDER_OPTIONS,
        payload:{
            smoking : options.smoking || 0,
            gender :  options.gender || 0,
            english : options.english || 0,
            babySeat : options.babySeat || 0,
            dogPlace : options.dogPlace ||0,
            numberSeats : options.numberSeats || 3,
            carType : options.carType || 4,
            terminal : options.terminal || 0,
            ads : options.ads || 0,
            baggage : options.baggage || 0
        },
    }
}
