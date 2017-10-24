import * as directoryTypes from '../constants/directory'

const initailState = {
    directoryList:[]
}

export default function directory(state=initailState,action){
    switch (action.type) {
        case directoryTypes.INIT_DIRECTORY_LIST:
            return {...state,...action.payload}
            break
        case directoryTypes.LOAD_DIRECTORY_LIST:
            return {...state,...action.payload}
            break
    
        default:
            return state
            break
    }
}