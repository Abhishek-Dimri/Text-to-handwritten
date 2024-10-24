// store.js

import { createStore } from 'redux';
import textReducer from './reducers';

const store = createStore(textReducer);

export default store;
