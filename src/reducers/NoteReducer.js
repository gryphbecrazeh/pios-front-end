import {
	GET_NOTES,
	ADD_NOTE,
	DELETE_NOTE,
	EDIT_NOTE,
	CLEAR_NOTES
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
				notes: [action.payload, ...state.notes]
			};
		}
		case EDIT_NOTE:
			return {
				...state
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
		default:
			return state;
	}
}
