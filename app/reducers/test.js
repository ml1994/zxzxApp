import * as actionTypes from '../constants/test'

const initailState = {}

export default (state = initailState, action) => {
    switch (action.type) {
        case actionTypes.IS_MODAL_SHOW:
            return action.payload
        default:
            return state
    }
}