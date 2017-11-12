import * as appStateActions from '../constants/appState'

export function fetch(payload) {
    return {
        type:appStateActions.FETCHING,
        payload
    }
}

export function fetchEnd(payload) {
    return {
        type:appStateActions.FETCHED,
        payload
    }
}

export function netConnect(payload){
    return {
        type:appStateActions.CONNECTED,
        payload
    }
}