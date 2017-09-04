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

//thunk异步action
export function getInfo(payloadUrl){
    return dispatch=>{
        // type:userinfoActions.GET_INFO,
        // payload
        dispatch({type:'GETING'})
        fetch(payloadUrl)
        .then(res=>{
            dispatch(login(res.json()))
        }).catch(()=>{
            dispatch({type:'GET_ERROR'})
        })
    }
}