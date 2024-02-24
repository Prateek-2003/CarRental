import { legacy_createStore as createStore } from 'redux';
import { applyMiddleware ,combineReducers} from 'redux';
import { compose } from 'redux';
//import { composeWithDevTools } from 'redux-devtools-extension';
import {thunk} from 'redux-thunk';
import { carsReducers } from './reducers/carsReducers';
import {bookingsReducers} from './reducers/bookingsReducers'
const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;
//const composeEnhancers = composeWithDevTools({});
const rootReducer = combineReducers({
   carsReducers,
   bookingsReducers,
})
const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk)
    
  )
);
export default store