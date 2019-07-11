import createReducer from './createReducer';


export const TOP_DOMAINS = 'TOP_DOMAINS';
export const SET_TOP_DOMAINS = 'SET_TOP_DOMAINS';
export const setTopStories = domains => {
  return {
    type: SET_TOP_DOMAINS,
    payload: domains
  };
};


const initialState = {};

const actionHandlers = {
  [SET_TOP_DOMAINS](state, action) {
    const { payload } = action;

    return {
      TOP_STORIES: [ ...payload ]
    };
  }
};


export default createReducer(initialState, actionHandlers);
