import * as newsActions from '../constants/news'

export function loadEncyList(payload) {
    return {
        type:newsActions.LOAD_ENCY_LIST,
        payload
    }
}

export function loadNewList(payload) {
    return {
        type:newsActions.LOAD_NEWS_LIST,
        payload
    }
}

export function getSearchList(payload) {
    return {
        type:newsActions.GET_SEARCH_LIST,
        payload
    }
}