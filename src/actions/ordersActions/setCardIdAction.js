import {SET_CARD_ID} from "./orderActions";

export default function setCardIdAction(id) {
    return{
        type: SET_CARD_ID,
        payload: {
            id:id
        }
    }
}