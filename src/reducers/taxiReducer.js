import React from 'react';
import { combineReducers } from 'redux'
import Load from '../components/Load/Load';

import user from './userReducer';
import app from  './appReducer';

const initialState = {
    app: {
        currentScreen: <Load/>
    },
    user: {
        token: localStorage.getItem('token')|| null,
    }
};


export default combineReducers({
    app,
    user,
})


