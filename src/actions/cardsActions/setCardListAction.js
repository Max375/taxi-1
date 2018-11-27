import {SET_CARDS_LIST} from "./cardsActions";

export default function clearTradesAction(cards) {
    return{
        type: SET_CARDS_LIST,
        payload: {
            cards: cards
        }
    }
}
