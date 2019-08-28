import {
	GET_CLAIMS,
	ADD_CLAIM,
	DELETE_CLAIM,
	EDIT_CLAIM,
	CLEAR_CLAIMS
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
				claims: [action.payload, ...state.claims]
			};
		}
		case EDIT_CLAIM:
			return {
				...state
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
		default:
			return state;
	}
}
