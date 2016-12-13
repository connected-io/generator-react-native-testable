import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { rootReducer } from './reducer.js'

let store;

let getStore = () => {
    if (!store) {
        resetStore();
    }
    return store;
};

let resetStore = () => {
    store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
};


module.exports = {getStore, resetStore};