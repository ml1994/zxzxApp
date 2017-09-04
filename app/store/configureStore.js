import {createStore, applyMiddleware} from 'redux'
import rootReducer from '../reducers'
import thunk from 'redux-thunk'
import promisemw from 'redux-promise'
import logger from 'redux-logger'

export default function configureStore(initialState) {
    const store = createStore(rootReducer, initialState, applyMiddleware(thunk, promisemw, logger))
    return store
}