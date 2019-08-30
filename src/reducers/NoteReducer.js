import {
	GET_NOTES,
	ADD_NOTE,
	DELETE_NOTE,
	EDIT_NOTE,
	CLEAR_NOTES,
	CLEAR_ACTIONS
} from "../actions/types";
const initialState = {
	notes: []
};
export default function(state = initialState, action) {
	switch (action.type) {
		case GET_NOTES: {
			return {
				...state,
				notes: [...action.payload]
			};
		}
		case ADD_NOTE: {
			return {
				...state,
				notes: [action.payload.item, ...state.notes],
				success: action.payload.success,
				msg: action.payload.msg
			};
		}
		case EDIT_NOTE:
			return {
				...state,
				...action.payload
			};
		case DELETE_NOTE:
			return {
				...state,
				notes: state.notes.filter(item => item._id !== action.payload)
			};
		case CLEAR_NOTES:
			return {
				notes: []
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
