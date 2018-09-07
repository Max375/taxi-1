import {SET_FAVORITES_POINTS} from './actionList';

export default function setFavoritePoint(points) {
    return{
        type: SET_FAVORITES_POINTS,
        payload:{
            points: points
        },
    }
}