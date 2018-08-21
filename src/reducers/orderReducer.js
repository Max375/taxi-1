import {SET_ORDER_START_POINT,SET_ORDER_END_POINT, SET_ORDER_PRICE} from '../actions/actionList';
import Load from "../components/Load/Load";
import React from "react";


const initialState = {
    endPoint: null,
    startPoint: null
};



export default function order(state = initialState , action) {
    switch (action.type) {
        case SET_ORDER_END_POINT:
            return{
                ...state,
                endPoint: action.payload.endPoint
            };
        case SET_ORDER_START_POINT:
            return{
                ...state,
                startPoint: action.payload.startPoint
            };
        case SET_ORDER_PRICE:
            return{
                ...state,
                price: action.payload.price
            };

        default:
            return state;
    }
}