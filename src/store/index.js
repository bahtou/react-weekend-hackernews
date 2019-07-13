import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from 'Reducers';
import sagaCoordinator from 'Saga';


const sagaMiddleware = createSagaMiddleware();
// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer, /* preloadedState, */
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(sagaCoordinator);

// Enable Webpack hot module replacement for reducers
// eslint-disable-next-line no-process-env
if (!process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('../reducers', () => store.replaceReducer(rootReducer));
}


export default store;
