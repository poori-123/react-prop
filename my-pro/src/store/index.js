import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import home from '../pages/Home/store';
import category from '../pages/Category/store';
import detail from '../pages/Detail/store';
import userInfo from '../pages/Login/store/index';
import cart from '../pages/Cart/store';

import detailEffect from '../pages/Detail/store/action';
import userEffect from '../pages/Login/store/actions';
import cartEffect from '../pages/Cart/store/actions';
var effects = [ detailEffect, userEffect, cartEffect ]

var sagaMiddleware = createSagaMiddleware();

var reducer = combineReducers({
    home: home,
    category,
    detail,
    userInfo,
    cart
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

var store = createStore(reducer, composeEnhancers(
    applyMiddleware( thunk, sagaMiddleware )
));

effects.forEach( item => {
    sagaMiddleware.run(item);
} )

export default store;