import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

var reducer = combineReducers({
    test: (state={}, action)=>{
        return state
    }
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

var store = createStore(reducer, composeEnhancers(
    applyMiddleware(thunk)
));
export default store;