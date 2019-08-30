import {
	GET_PRODUCTS,
	EDIT_PRODUCT,
	ADD_PRODUCT,
	DELETE_PRODUCT,
	CLEAR_ACTIONS
} from "../actions/types";
const initialState = {
	products: []
};
export default function(state = initialState, action) {
	switch (action.type) {
		case GET_PRODUCTS: {
			return {
				...state,
				products: [...action.payload]
			};
		}
		case ADD_PRODUCT: {
			return {
				...state,
				products: [action.payload.item, ...state.products],
				success: action.payload.success,
				msg: action.payload.msg
			};
		}
		case EDIT_PRODUCT:
			return {
				...state,
				...action.payload
			};
		case DELETE_PRODUCT:
			return {
				...state,
				products: state.products.filter(item => item._id !== action.payload)
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
