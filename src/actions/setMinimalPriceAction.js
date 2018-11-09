import {SET_MINIMAL_PRICE} from './actionList';

export default function setMinimalPrice(minimalPrice) {
    return{
        type: SET_MINIMAL_PRICE,
        payload:{
            minimalPrice: minimalPrice
        },
    }
}