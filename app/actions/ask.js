import * as askActions from '../constants/ask'

export function initAskList() {
    return {
        type:askActions.INIT_ASK_LIST,
        payload:{
            askList:[]
        }
    }
}
export function loadAskList(payload) {
    return {
        type:askActions.LOAD_ASK_LIST,
        payload
    }
}
export function addAskList(payload) {
    return {
        type:askActions.ADD_ASK_LIST,
        payload
    }
}
export function initCompAskList() {
    return {
        type:askActions.INIT_COMPASK_LIST,
        payload:{
            compAskList:[]
        }
    }
}
export function loadCompAskList(payload) {
    return {
        type:askActions.LOAD_COMPASK_LIST,
        payload
    }
}
export function initQaList() {
    return {
        type:askActions.INIT_QA_LIST,
        payload:{
            title:'',
            descr:'',
            created:'',
            qaList:[]
        }
    }
}
export function loadQaList(payload) {
    return {
        type:askActions.LOAD_QA_LIST,
        payload
    }
}
export function addQaList(payload) {
    return {
        type:askActions.ADD_QA_LIST,
        payload
    }
}