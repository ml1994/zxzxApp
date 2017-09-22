import * as newsTypes from '../constants/news'

const initailState = {
    searchList:[]
}

export default function (state=initailState,action) {
    switch (action.type) {
        case newsTypes.INIT_NEWS_LIST:
            return {...state,...action.payload}
        case newsTypes.LOAD_NEWS_LIST:
            return {...state,...action.payload}
        case newsTypes.GET_SEARCH_LIST:
            return {...state,...action.payload}
        default:
            return state
    }
}