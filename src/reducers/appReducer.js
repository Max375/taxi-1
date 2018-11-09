import {CHANGE_SCREEN, SET_DEVICE_ID, SET_MINIMAL_PRICE} from '../actions/actionList';
import React from "react";

const initialState = {
    currentScreen: null,
    minimalPrice: 0,
    deviceId: null
};

export default function app(state = initialState , action) {
    switch (action.type) {
        case CHANGE_SCREEN:
        {
            return {
                ...state,
                currentScreen: action.payload.currentScreen
            };
        }
        case SET_DEVICE_ID: return{
            ...state, deviceId: action.payload.deviceId
        };

        case SET_MINIMAL_PRICE: return{
            ...state, minimalPrice: action.payload.minimalPrice
        };
        default:
            return state;
    }
}