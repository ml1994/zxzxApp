import * as appStateTypes from '../constants/appState'

const initailState = {
    isConnected:null,
    fetching:false
}

export default function (state = initailState,action) {
    switch (action.type) {
        case appStateTypes.FETCHING:
            return {...state,...action.payload}
        case appStateTypes.FETCHED:
            return {...state,...action.payload}
        case appStateTypes.CONNECTED:
            return {...state,...action.payload}
        default:
            return state
    }
}