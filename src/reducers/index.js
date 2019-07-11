import { combineReducers } from 'redux';

import bestStories from './bestStories';
import topStories from './topStories';


const rootReducer = combineReducers({
  BEST_STORIES: bestStories,
  TOP_STORIES: topStories
});


export default rootReducer;
