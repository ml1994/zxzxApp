import * as userinfoActions from '../constants/userinfo'

export function initial(payload) {
    return {
        type:userinfoActions.INIT_LOGIN,
        payload
    }
}

export function login(payload){
    return {
        type:userinfoActions.LOGINED,
        payload
    }
}
