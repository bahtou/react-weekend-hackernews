import { put } from 'redux-saga/effects';


function Pipeline(channel) {
  const ctx = {
    params: {},
    state: {}
  };
  let actionSequence = [];

  function params(args) {
    ctx.params = { ...args };
    return this;
  }

  function* next() {
    const action = actionSequence.shift();

    yield put({ type: action, ctx, next });
  }

  function use(...actions) {
    actionSequence = actions;

    return {
      type: channel || actionSequence.shift(),
      ctx, next
    };
  }

  return { params, next, use };
}


export default Pipeline;
