import {SET_ORDER_COMMENT} from './actionList';

export default function setOrderCommentAction(comment) {
    return{
        type: SET_ORDER_COMMENT,
        payload:{
            comment: comment
        },
    }
}
