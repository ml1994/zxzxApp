import {combineReducers} from 'redux'

import nav from './nav'
import userinfo from './userinfo'
import test from './test'


const rootReducer = combineReducers({
    nav,
    userinfo,
    test
})

export default rootReducer