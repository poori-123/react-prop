import React from 'react';
import ReactDom from 'react-dom';

import App from './app';

import {Provider} from 'react-redux';
import store from './store';

import ErrorBoundary from './pages/ErrorBoundary/ErrorBoundary';

ReactDom.render(
    <ErrorBoundary>
        <Provider store={store}>
            <App/>
        </Provider>  
    </ErrorBoundary>,
    document.querySelector('#root')
)