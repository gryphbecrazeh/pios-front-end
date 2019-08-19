import {
	GET_FILTERS,
	ADD_FILTER,
	DELETE_FILTER,
	EDIT_FILTER,
	FILTERS_CLEAR
} from "../actions/types";

const initialState = {
	filters: [],

};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_FILTERS:{
            return {
				...state,
				filters: action.payload,
				loading: false
			};
        }
		case ADD_FILTER:
			return {
				...state,
				filters: [action.payload, ...state.filters]
			};
		case EDIT_FILTER:
			return {
				...state
			};
		case DELETE_FILTER:
			return {
				...state,
				filters: state.filters.filter(
					item => item._id !== action.payload
				)
			};
		case FILTERS_CLEAR:
			return {
				...state,
				filter: []
			};
		default:
			return state;
	}
}
