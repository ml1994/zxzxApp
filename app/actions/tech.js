import * as techAction from '../constants/tech'

export function initTechList() {
	return {
		type: techAction.INIT_TECH_LIST,
		payload: {
			techList: [],
			ifRegister: '',
			baseUrl: ''
		}
	}
}

export function loadTechList(payload) {
	return {
		type: techAction.LOAD_TECH_LIST,
		payload
	}
}