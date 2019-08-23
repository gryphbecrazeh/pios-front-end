import {
	GET_PRODUCTS,
	EDIT_PRODUCT,
	ADD_PRODUCT,
	DELETE_PRODUCT
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
				products: [action.payload, ...state.products]
			};
		}
		case EDIT_PRODUCT:
			return {
				...state
			};
		case DELETE_PRODUCT:
			return {
				...state,
				products: state.products.filter(item => item._id !== action.payload)
			};
		default:
			return state;
	}
}
