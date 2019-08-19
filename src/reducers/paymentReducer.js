import {
    GET_PAYMENTS,
    ADD_PAYMENT,
    EDIT_PAYMENT,
    DELETE_PAYMENT,
    PAYMENTS_LOADING
} from "../actions/types";
const initialState = {
	payments: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_PAYMENTS:
			return {
				...state,
				payments: action.payload,
				loading: false
			};
		case ADD_PAYMENT:{
			console.log(action.payload)
			return {
				...state,
				payments: [action.payload, ...state.payments]
			};

		}		case EDIT_PAYMENT:
			return {
				...state
			};
		case DELETE_PAYMENT:
			return {
				...state,
				payments: state.payments.filter(
					item => item._id !== action.payload
				)
			};
		case PAYMENTS_LOADING:
			return {
				...state,
				loading: true
			};

		default:
			return state;
	}
}
