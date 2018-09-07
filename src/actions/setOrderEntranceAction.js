import {SET_ORDER_ENTRANCE} from './actionList';

export default function setOrderEntranceAction(entrance) {
    return{
        type: SET_ORDER_ENTRANCE,
        payload:{
            entrance: entrance
        },
    }
}
