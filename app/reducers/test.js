import * as actionTypes from '../constants/test'

const initailState = {
    maxScore:[0,0,0,0]
}

export default (state = initailState, action) => {
    switch (action.type) {
        case actionTypes.IS_MODAL_SHOW:
            return {...state,...action.payload}
        case actionTypes.INIT_MAX_SCORE:
            return {...state,...action.payload}
        case actionTypes.GET_MAX_SCORE:
            return {...state,...action.payload}
        default:
            return state
    }
}