import * as messageActions from '../constants/message'

export function loadList(payload){
    return {
        type:messageActions.LOAD_MESSAGE_LIST,
        payload
    }
}
export function del(payload){
    return {
        type:messageActions.DEL_MESSAGE,
        payload
    }
}
export function changeState(payload){
    return {
        type:messageActions.CHANGE_MESSAGE_STATE,
        payload
    }
}