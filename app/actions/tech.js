import * as techActions from '../constants/tech'

export function initTechList() {
	return {
		type: techActions.INIT_TECH_LIST,
		payload: {
			techList: [],
			ifRegister: '',
			baseUrl: ''
		}
	}
}

export function loadTechList(payload) {
	return {
		type: techActions.LOAD_TECH_LIST,
		payload
	}
}