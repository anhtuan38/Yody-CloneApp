import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './redux/reducers';
import rootSaga from './redux/sagas';
import { logger } from './helper';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
// mount it on the Store
const store = createStore(logger(rootReducer), applyMiddleware(sagaMiddleware));

// render the application

sagaMiddleware.run(rootSaga);

export default store;
