import { combineReducers } from 'redux';
import mockReducer from './mockReducer';

const rootReducer = combineReducers(
  {
    myList: mockReducer,
    trends: mockReducer,
    originals: mockReducer,
    featureVideo: mockReducer,
  },
);

export default rootReducer;
