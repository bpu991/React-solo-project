import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import photoReducer from './photos';
import authReducer from './auth';
import profileReducer from './profile'
import exploreReducer from './explore';
import commentReducer from './comments';
import searchReducer from './search';

const rootReducer = combineReducers({
    authReducer,
    photoReducer,
    profileReducer,
    exploreReducer,
    commentReducer,
    searchReducer
});

let storeEnhancer;

if(process.env.NODE_ENV !== 'production') {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    storeEnhancer = composeEnhancers(applyMiddleware(thunk));
} else {
    storeEnhancer = applyMiddleware(thunk);
}

export default function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        storeEnhancer
    )
}