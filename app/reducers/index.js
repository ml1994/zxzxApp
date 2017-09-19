import {combineReducers} from 'redux'

import nav from './nav'
import userinfo from './userinfo'
import test from './test'
import ask from './ask'


const rootReducer = combineReducers({
    nav,
    userinfo,
    test,
    ask
})

export default rootReducer