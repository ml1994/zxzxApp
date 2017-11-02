import * as testActions from '../constants/test'

export function toggleModal(payload) {
	return {
		type: testActions.IS_MODAL_SHOW,
		payload
	}
}

export function initMaxScore() {
	return {
		type: testActions.INIT_MAX_SCORE,
		payload: {
			maxScore: [0, 0, 0, 0, 0]
		}
	}
}

export function getMaxScore(payload) {
	return {
		type: testActions.GET_MAX_SCORE,
		payload
	}
}

export function getTestType(payload) {
	return {
		type: testActions.GET_TEST_TYPE,
		payload
	}
}