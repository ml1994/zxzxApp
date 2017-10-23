import {combineReducers} from 'redux'

import nav from './nav'
import news from './news'
import userinfo from './userinfo'
import test from './test'
import ask from './ask'
import appState from './appState'
import tech from './tech'
import message from './message'

const rootReducer = combineReducers({
    nav,
    news,
    userinfo,
    test,
    ask,
    appState,
    tech,
    message
})

export default rootReducer