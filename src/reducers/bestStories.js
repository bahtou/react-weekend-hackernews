import createReducer from './createReducer';


export const BEST_STORIES = 'BEST_STORIES';
export const SET_BEST_STORIES = 'SET_BEST_STORIES';
export const setBestStories = stories => {
  return {
    type: SET_BEST_STORIES,
    payload: stories
  };
};


const initialState = [];

const actionHandlers = {
  [SET_BEST_STORIES](state, action) {
    return action.payload;
  }
};


export default createReducer(initialState, actionHandlers);
