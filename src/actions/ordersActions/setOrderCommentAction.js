import {SET_ORDER_COMMENT} from './orderActions';

export default function setOrderCommentAction(comment) {
    return{
        type: SET_ORDER_COMMENT,
        payload:{
            comment: comment
        },
    }
}
