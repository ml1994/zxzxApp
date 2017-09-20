import * as appStateActions from '../constants/appState'

export function fetch(payload) {
    return {
        type:appStateActions.FETCHING,
        payload
    }
}