import {combineReducers} from 'redux'

import nav from './nav'
import userinfo from './userinfo'
import test from './test'
import ask from './ask'
import appState from './appState'


const rootReducer = combineReducers({
    nav,
    userinfo,
    test,
    ask,
    appState
})

export default rootReducer