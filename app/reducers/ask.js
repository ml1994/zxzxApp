import * as askTypes from '../constants/ask'

const initailState = {}
export default function (state=initailState,action) {
    switch (action.type) {
        case askTypes.ADD_ASK_LIST:
            return {...state,...action.payload}
            break;
        case askTypes.INIT_ASK_LIST:
            return {...state,...action.payload}
            break;
        case askTypes.LOAD_ASK_LIST:
            return {...state,...action.payload}
            break;
        case askTypes.ADD_QA_LIST:
            return {...state,...action.payload}
            break;
        case askTypes.INIT_QA_LIST:
            return {...state,...action.payload}
            break;
        case askTypes.LOAD_QA_LIST:
            return {...state,...action.payload}
            break;
    
        default:
            return state
    }
}