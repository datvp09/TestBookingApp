import {combineReducers} from 'redux';
import appReducer from './appReducer';
import bookingReducer from './bookingReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  data: appReducer,
  booking: bookingReducer,
  auth: authReducer,
});

export default rootReducer;
