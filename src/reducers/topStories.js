import createReducer from './createReducer';


export const TOP_STORIES = 'TOP_STORIES';
export const SET_TOP_STORIES = 'SET_TOP_STORIES';
export const setTopStories = stories => {
  return {
    type: SET_TOP_STORIES,
    payload: stories
  };
};


const initialState = [];

const actionHandlers = {
  [SET_TOP_STORIES](state, action) {
    return action.payload;
  }
};


export default createReducer(initialState, actionHandlers);
