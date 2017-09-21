import * as newsTypes from '../constants/news'

const initailState = {}

export default function (state=initailState,action) {
    switch (action.type) {
        case newsTypes.INIT_NEWS_LIST:
            return action.payload
        case newsTypes.LOAD_NEWS_LIST:
            return action.payload
        default:
            return state
    }
}