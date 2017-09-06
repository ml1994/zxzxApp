import {combineReducers} from 'redux'
import userinfo from './userinfo'
import nav from './nav'

const rootReducer = combineReducers({
    nav,
    userinfo
})

export default rootReducer