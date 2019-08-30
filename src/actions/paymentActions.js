import axios from "axios";
import {
	GET_PAYMENTS,
	ADD_PAYMENT,
	EDIT_PAYMENT,
	DELETE_PAYMENT,
	PAYMENTS_LOADING,
	CLEAR_PAYMENTS,
	PAYMENTS_CLEAR_ACTIONS
} from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";
export const clearPayments = () => (dispatch, getState) => {
	dispatch({ type: CLEAR_PAYMENTS });
};
export const getPayments = id => (dispatch, getState) => {
	// Gets orders by order number as ID
	dispatch(setPaymentsLoading);
	axios
		.get(`/api/payments/${id}`)
		.then(res => {
			dispatch({
				type: GET_PAYMENTS,
				payload: res.data
			});
		})
		.catch(err =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
};
export const addPayment = item => (dispatch, getState) => {
	axios
		.post("/api/payments", item, tokenConfig(getState))
		.then(res =>
			dispatch({
				type: ADD_PAYMENT,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
};

export const editPayment = item => (dispatch, getState) => {
	let newItem = item;

	axios
		.put(
			`/api/payments/${item._id}`,
			{ id: item._id, order: newItem },
			tokenConfig(getState)
		)
		.then(res =>
			dispatch({
				type: EDIT_PAYMENT,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
};

export const deletePayment = id => (dispatch, getState) => {
	axios
		.delete(`/api/payments/${id}`, tokenConfig(getState))
		.then(res =>
			dispatch({
				type: DELETE_PAYMENT,
				payload: id
			})
		)
		.catch(err =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
};
export const setPaymentsLoading = () => {
	return {
		type: PAYMENTS_LOADING
	};
};
export const clearActions = () => (dispatch, getState) => {
	return {
		type: PAYMENTS_CLEAR_ACTIONS
	};
};
