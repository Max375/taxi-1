import {CHANGE_SCREEN} from '../actions/actionList';
import Load from "../components/Load/Load";
import React from "react";
import Order from "../components/Order/Order";

const initialState = {
        currentScreen: null
};

export default function app(state = initialState , action) {
    console.log(state);
    switch (action.type) {
        case CHANGE_SCREEN:
        {
            return {
                ...state,
                currentScreen: action.payload.currentScreen
            };
        }
        default:
            return state;
    }
}