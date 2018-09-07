import {SET_ORDER_START_POINT,SET_ORDER_END_POINTS, SET_ORDER_PRICE, SET_ORDER, SET_ORDER_COMMENT,SET_ORDER_ENTRANCE} from '../actions/actionList';
import Load from "../components/Load/Load";
import React from "react";



const initialState = {
    id: null,
    endPoints: [null],
    startPoint: null,
    price: 0,
    entrance: '',
    status: null,
    comment: '',

};


export default function order(state = initialState , action) {
    switch (action.type) {
        case SET_ORDER_END_POINTS:
            return{
                ...state,
                endPoints: action.payload.endPoints
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
        case SET_ORDER:
            return{
                ...action.payload
            };
        case SET_ORDER_ENTRANCE:
            return{
                ...state,
                entrance: action.payload.entrance
            };
        case SET_ORDER_COMMENT:
            return{
                ...state,
                comment: action.payload.comment
            };
        default:
            return state;
    }
}