import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import { Provider } from 'react-redux';
import {getToken, store, setPushListener} from './secondary';


document.addEventListener ("deviceready",() => {
    setTimeout(getToken, 1000);
    setPushListener();
});



ReactDOM.render((
    <Provider store={store}>
        <App store={store} />
    </Provider>
), document.getElementById('root'));
