import {
	GET_FILTERS,
	ADD_FILTER,
	DELETE_FILTER,
	EDIT_FILTER,
	FILTERS_CLEAR
} from "../actions/types";
let d = new Date();
d.setDate(d.getDate() - 14);

const initialState = {
	sort: true,
	sortStart: d,
	showAll: false,
	sortEnd: new Date(Date.now()),
	searchQuery: ""
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_FILTERS: {
			return {
				...state
			};
		}
		case ADD_FILTER: {
			return {
				...state,
				...action.payload.filters,
				showAll:
					action.payload.showAll === true || action.payload.showAll === false
						? action.payload.showAll
						: state.showAll
			};
		}
		case EDIT_FILTER:
			return {
				...state
			};
		case DELETE_FILTER:
			return {
				...state,
				filters: state.filters.filter(item => item._id !== action.payload)
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
