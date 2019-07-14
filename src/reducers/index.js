import { combineReducers } from 'redux';

import bestStories from './bestStories';
import topStories from './topStories';
import topDomains from './topDomains';


const rootReducer = combineReducers({
  BEST_STORIES: bestStories,
  TOP_STORIES: topStories,
  TOP_DOMAINS: topDomains
});


export default rootReducer;
