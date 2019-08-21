import {
	GET_PAYMENTS,
	ADD_PAYMENT,
	EDIT_PAYMENT,
	DELETE_PAYMENT,
	PAYMENTS_LOADING,
	CLEAR_PAYMENTS
} from "../actions/types";
const initialState = {
	payments: [],
	customer_order: null,
	order_number: null,
	payment_type: null,
	payment_date: null,
	total_due: null,
	total_paid: null,
	remaining_balance: null,
	note: null,
	user: null
};
const defaultState = {
	payments: [],
	customer_order: null,
	order_number: null,
	payment_type: null,
	payment_date: null,
	total_due: null,
	total_paid: null,
	remaining_balance: null,
	note: null,
	user: null
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_PAYMENTS: {
			console.log("getting items", action.payload);
			return {
				...state,
				payments: [...action.payload]
			};
		}
		case ADD_PAYMENT: {
			return {
				...state,
				payments: [action.payload, ...state.payments]
			};
		}
		case EDIT_PAYMENT:
			return {
				...state
			};
		case DELETE_PAYMENT:
			return {
				...state,
				payments: state.payments.filter(item => item._id !== action.payload)
			};
		case PAYMENTS_LOADING:
			return {
				...state,
				loading: true
			};
		case CLEAR_PAYMENTS: {
			state = defaultState;
			return defaultState;
		}
		default:
			return state;
	}
}
