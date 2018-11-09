import  {SET_ORDER_PRICE} from './orderActions';

export default function setOrderPriceAction(newPrice) {
    return{
        type: SET_ORDER_PRICE,
        payload:{
            price: newPrice,
        }
    }
}