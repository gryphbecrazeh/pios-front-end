import {
	GET_ORDEREDSKUS,
	ADD_ORDEREDSKU,
	DELETE_ORDEREDSKU,
	EDIT_ORDEREDSKU,
	CLEAR_ORDEREDSKUS,
	CLEAR_ACTIONS
} from "../actions/types";
const initialState = {
	orderedSkus: []
};
export default function(state = initialState, action) {
	switch (action.type) {
		case GET_ORDEREDSKUS: {
			return {
				...state,
				orderedSkus: [...action.payload]
			};
		}
		case ADD_ORDEREDSKU: {
			return {
				...state,
				orderedSkus: [action.payload.item, ...state.orderedSkus],
				success: action.payload.success,
				msg: action.payload.msg
			};
		}
		case EDIT_ORDEREDSKU:
			return {
				orderedSkus: [],
				...action.payload
			};
		case DELETE_ORDEREDSKU:
			return {
				...state,
				orderedSkus: state.orderedSkus.filter(
					item => item._id !== action.payload
				)
			};
		case CLEAR_ORDEREDSKUS:
			return {
				orderedSkus: []
			};
		case CLEAR_ACTIONS:
			return {
				...state,
				success: null,
				msg: null
			};
		default:
			return state;
	}
}
