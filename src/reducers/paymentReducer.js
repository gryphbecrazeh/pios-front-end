import {
	GET_PAYMENTS,
	ADD_PAYMENT,
	EDIT_PAYMENT,
	DELETE_PAYMENT,
	PAYMENTS_LOADING,
	CLEAR_PAYMENTS,
	PAYMENTS_CLEAR_ACTIONS
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
	user: null,
	payment_status: null,
	payment_method: null
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
	user: null,
	payment_method: null
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_PAYMENTS: {
			return {
				...state,
				payments: [...action.payload]
			};
		}
		case ADD_PAYMENT: {
			return {
				...state,
				payments: [action.payload.item, ...state.payments],
				success: action.payload.success,
				msg: action.payload.msg
			};
		}
		case EDIT_PAYMENT:
			return {
				...state,
				...action.payload
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
			return { ...defaultState, success: null, msg: null };
		}
		case PAYMENTS_CLEAR_ACTIONS: {
			return {
				...state,
				success: null,
				msg: null
			};
		}
		default:
			return state;
	}
}
