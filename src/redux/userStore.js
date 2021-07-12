import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import reducer from './users/userReducer'
const store = createStore(
    reducer,
    applyMiddleware(logger, thunk)
)

export default store