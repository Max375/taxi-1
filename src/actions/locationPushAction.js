import {DRIVER_LOCATION_UPDATE} from './actionList';

export default function locationPushAction(location) {
    console.log(location);
    return{
        type: DRIVER_LOCATION_UPDATE,
        payload:{
            location: location
        },
    }
}
