import  {SET_ORDER_PRICE} from './actionList';

export default function setUserEndPoint(newPrice) {
    return{
        type: SET_ORDER_PRICE,
        payload:{
            endPoint: newPrice,
        }
    }
}