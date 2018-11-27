import {SET_CARDS_LIST} from '../actions/cardsActions/cardsActions';
import React from "react";

const initialState = {
    cards: [],
};

export default function cards(state = initialState, action) {
    switch (action.type) {
        case SET_CARDS_LIST:{
            return {
                ...state,
                cards: action.payload.cards
            }
        }
        default:{
            return state;
        }
    }
}