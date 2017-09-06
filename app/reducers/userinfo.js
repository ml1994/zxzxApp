import * as actionTypes from '../constants/userinfo'

const initialState = {};

export default function userinfo(state=initialState,action){
    switch (action.type) {
        case actionTypes.INIT_LOGIN:
            return action.payload
        case actionTypes.LOGINED:
            return action.payload
        case actionTypes.GET_INFO:
            return action.payload
        default:
            return state
    }
}