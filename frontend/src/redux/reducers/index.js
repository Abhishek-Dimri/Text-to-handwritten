import { combineReducers } from 'redux';
import textReducer from './textReducer';

const rootReducer = combineReducers({
  textData: textReducer,
});

export default rootReducer;