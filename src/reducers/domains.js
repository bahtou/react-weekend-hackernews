import createReducer from './createReducer';


export const TOP_DOMAINS = 'TOP_DOMAINS';
export const BEST_DOMAINS = 'BEST_DOMAINS';
export const SET_TOP_DOMAINS = 'SET_TOP_DOMAINS';
export const SET_BEST_DOMAINS = 'SET_BEST_DOMAINS';

export const setBestDomains = domains => {
  return {
    type: SET_BEST_DOMAINS,
    payload: domains
  };
};

export const setTopDomains = domains => {
  return {
    type: SET_TOP_DOMAINS,
    payload: domains
  };
};


const initialState = {
  [TOP_DOMAINS]: [],
  [BEST_DOMAINS]: []
};

const actionHandlers = {
  [SET_TOP_DOMAINS](state, action) {
    return {
      ...state,
      [TOP_DOMAINS]: action.payload
    };
  },
  [SET_BEST_DOMAINS](state, action) {
    return {
      ...state,
      [BEST_DOMAINS]: action.payload
    };
  }
};


export default createReducer(initialState, actionHandlers);
