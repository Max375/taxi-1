import {SET_ORDER_CAR_TYPE} from "./orderActions";

export default function setOrderCarTypeAction(carType) {

    return{
        type: SET_ORDER_CAR_TYPE,
        payload: {
            carType: parseInt(carType)
        }
    }
}