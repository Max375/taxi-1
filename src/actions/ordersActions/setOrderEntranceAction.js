import {SET_ORDER_ENTRANCE} from './orderActions';

export default function setOrderEntranceAction(entrance) {
    return{
        type: SET_ORDER_ENTRANCE,
        payload:{
            entrance: entrance || 0
        },
    }
}
