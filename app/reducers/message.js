import * as messageTypes from '../constants/message'

const initailState = {
    messageList:[]
}

export default function(state=initailState,action){
    switch(action.type){
        case messageTypes.LOAD_MESSAGE_LIST:
            return {...state,...action.payload}
            break
        case messageTypes.DEL_MESSAGE:
            return {...state,...action.payload}
            break
        case messageTypes.CHANGE_MESSAGE_STATE:
            return {...state,...action.payload}
            break
        default:
            return state
    }
}