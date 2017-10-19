import * as techTypes from '../constants/tech'

const initailState = {
	techList: [],
	ifRegister: false,
	baseUrl: ''
}
export default function (state = initailState, action) {
	switch (action.type) {
		case techTypes.INIT_TECH_LIST:
			return {...state, ...action.payload}
			break;
		case techTypes.LOAD_TECH_LIST:
			return {...state, ...action.payload}
		default:
			return state
	}
}