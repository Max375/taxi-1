import {SET_DRIVER_LOCATION} from './driverActions';

export default function setDriverLocationAction(data) {

    return{
        type: SET_DRIVER_LOCATION,
        payload:{
            location: {
                lat: data.lat,
                lon: data.lon
            },
        },
    }
}