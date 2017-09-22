import * as userinfoActions from '../constants/userinfo'

export function initLogin() {
    return {
        type:userinfoActions.INIT_LOGIN,
        payload:{
            account:'',
            psw:'',
            vip:'',
            partner:''
        }
    }
}

export function login(payload){
    return {
        type:userinfoActions.LOGINED,
        payload
    }
}

export function loginOut() {
    return {
        type:userinfoActions.LOGIN_OUT,
        payload:{
            account:'',
            psw:'',
            vip:'',
            partner:''
        }
    }
}

export function getInfo(payload) {
    return {
        type:userinfoActions.GET_INFO,
        payload
    }
}


