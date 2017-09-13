import * as testActions from '../constants/test'

export function toggleModal(payload) {
    return {
        type: testActions.IS_MODAL_SHOW,
        payload
    }
}