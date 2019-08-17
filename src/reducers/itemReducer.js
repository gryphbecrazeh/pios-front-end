import {
	GET_ITEMS,
	ADD_ITEM,
	DELETE_ITEM,
	EDIT_ITEM,
	ITEMS_LOADING,
	ITEMS_CLEAR
} from "../actions/types";

const initialState = {
	customerOrders: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_ITEMS:
			return {
				...state,
				customerOrders: action.payload,
				loading: false
			};
		case ADD_ITEM:
			return {
				...state,
				customerOrders: [action.payload, ...state.customerOrders]
			};
		case EDIT_ITEM:
			return {
				...state
			};
		case DELETE_ITEM:
			return {
				...state,
				customerOrders: state.customerOrders.filter(
					item => item._id !== action.payload
				)
			};
		case ITEMS_LOADING:
			return {
				...state,
				loading: true
			};
		case ITEMS_CLEAR:
			return {
				...state,
				customerOrders: []
			};
		default:
			return state;
	}
}
