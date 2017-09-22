import * as newsActions from '../constants/news'

export function initNewsList() {
    return {
        type:newsActions.INIT_NEWS_LIST,
        payload:{
            newsList:[]
        }
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