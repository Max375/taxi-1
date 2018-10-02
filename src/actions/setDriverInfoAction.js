import {SET_DRIVER_INFO} from './actionList';

export default function setDriverInfoAction(data) {
    console.log(data,'in driver info');
    return{
        type: SET_DRIVER_INFO,
        payload:{
            location: data.location,
            rating: data.rating,
            phone: data.phone,
            car:{
                color: data.car.color,
                version: data.car.version,
                year: data.car.year,
            }
        },
    }
}