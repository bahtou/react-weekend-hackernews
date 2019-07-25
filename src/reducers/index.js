import { combineReducers } from 'redux';

import stories from './stories';
import domains from './domains';


const rootReducer = combineReducers({
  STORIES: stories,
  DOMAINS: domains
});


export default rootReducer;
