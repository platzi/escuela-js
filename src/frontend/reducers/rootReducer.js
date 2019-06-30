import { combineReducers } from 'redux';
import mockReducer from './mockReducer';

const rootReducer = combineReducers(
  {
    name: mockReducer,
  },
);

export default rootReducer;
