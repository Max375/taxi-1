import  {SET_ORDER_PRICE} from './actionList';

export default function setUserPrice(newPrice) {
    return{
        type: SET_ORDER_PRICE,
        payload:{
            price: newPrice,
        }
    }
}