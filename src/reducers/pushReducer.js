import {DRIVER_LOCATION_UPDATE, DRIVER_MENU_PUSH, SET_DRIVER_INFO} from '../actions/actionList';
import React from "react";

const initialState = {
    location: null,
    menu: false,
};

export default function pushReducer(state = initialState , action) {
    switch (action.type) {
        case DRIVER_LOCATION_UPDATE:
        {
            return {
                ...state,
                location: action.payload.location
            };
        }

        case SET_DRIVER_INFO :{
            if (action.payload === null) return {...state};
            return{ ...state, location: action.payload.location}
        }

        case DRIVER_MENU_PUSH:
        {
            return{
                ...state,
                menu: action.payload.menu
            }
        }
        default:
            return state;
    }
}