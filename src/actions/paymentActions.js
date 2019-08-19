import axios from "axios";
import {
	GET_PAYMENTS,
	ADD_PAYMENT,
	EDIT_PAYMENT,
	DELETE_PAYMENT,
	PAYMENTS_LOADING
} from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";
export const getPayments = (id) => (dispatch, getState) => {
	dispatch(setPaymentsLoading);
	axios
		.get(`/api/payments`)
		.then(res =>{
			dispatch({
				type: GET_PAYMENTS,
				payload: res.data
			})
		}
		)
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
	// delete newItem._id;
	delete newItem.msg;
	delete newItem.mode;
	delete newItem.required;

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
