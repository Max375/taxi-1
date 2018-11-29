import {SET_DRIVER_INFO} from './driverActions';

export default function setDriverInfoAction(data) {

    if (data === null) return {
        type: SET_DRIVER_INFO,
        payload: null
    };

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
                colorCode: data.car.colorCode,
                model: data.car.model
            }
        },
    }
}