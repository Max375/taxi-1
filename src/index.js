import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import taxiReducer from './reducers/taxiReducer';
import { Provider } from 'react-redux';
import {composeWithDevTools} from "redux-devtools-extension";

import {createStore} from 'redux'


const store = createStore(taxiReducer,composeWithDevTools());





ReactDOM.render((
    <Provider store={store}>
        <App store={store} />
    </Provider>
), document.getElementById('root'));
