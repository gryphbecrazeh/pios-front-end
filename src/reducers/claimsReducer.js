import {
	GET_CLAIMS,
	ADD_CLAIM,
	DELETE_CLAIM,
	EDIT_CLAIM,
	CLEAR_CLAIMS,
	CLEAR_ACTIONS
} from "../actions/types";
const initialState = {
	claims: []
};
export default function(state = initialState, action) {
	switch (action.type) {
		case GET_CLAIMS: {
			return {
				...state,
				claims: [...action.payload]
			};
		}
		case ADD_CLAIM: {
			return {
				...state,
				success: action.payload.success,
				msg: action.payload.msg,
				claims: [action.payload.item, ...state.claims]
			};
		}
		case EDIT_CLAIM:
			return {
				...state,
				...action.payload
			};
		case DELETE_CLAIM:
			return {
				...state,
				claims: state.claims.filter(item => item._id !== action.payload)
			};
		case CLEAR_CLAIMS:
			return {
				claims: []
			};
		case CLEAR_ACTIONS: {
			return {
				...state,
				success: null,
				msg: null
			};
		}
		default:
			return state;
	}
}
