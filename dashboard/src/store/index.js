import { applyMiddleware, legacy_createStore as createStore } from 'redux'
import rootReducer from '../reducers';
import thunk from 'redux-thunk'
import logger from 'redux-logger'

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store;