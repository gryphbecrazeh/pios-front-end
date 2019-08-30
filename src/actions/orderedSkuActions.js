import axios from "axios";
import {
	GET_ORDEREDSKUS,
	ADD_ORDEREDSKU,
	DELETE_ORDEREDSKU,
	CLEAR_ORDEREDSKUS,
	CLEAR_ACTIONS
} from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const getOrderedSkus = id => (dispatch, getState) => {
	axios
		.get(`/api/orderedSkus/${id}`)
		.then(res => {
			dispatch({
				type: GET_ORDEREDSKUS,
				payload: res.data
			});
		})
		.catch(err =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
};
export const addOrderedSku = item => (dispatch, getState) => {
	axios
		.post("/api/orderedSkus", item, tokenConfig(getState))
		.then(res => {
			dispatch({
				type: ADD_ORDEREDSKU,
				payload: res.data
			});
		})
		.catch(err => {
			console.log(err);
			console.log("there was an error");
			dispatch(returnErrors(err.response.data, err.response.status));
		});
};

export const editOrderedSku = item => (dispatch, getState) => {
	let newItem = item;

	axios
		.put(
			`/api/orderedSkus/${item._id}`,
			{ id: item._id, orderedSku: newItem },
			tokenConfig(getState)
		)
		.then(res =>
			dispatch({
				type: GET_ORDEREDSKUS,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
};

export const deleteOrderedSku = id => (dispatch, getState) => {
	axios
		.delete(`/api/orderedSkus/${id}`, tokenConfig(getState))
		.then(res =>
			dispatch({
				type: DELETE_ORDEREDSKU,
				payload: id
			})
		)
		.catch(err =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
};
export const clearOrderedSkus = () => (dispatch, getState) => {
	dispatch({
		type: CLEAR_ORDEREDSKUS
	});
};
export const clearActions = () => (dispatch, getState) => {
	dispatch({
		type: CLEAR_ACTIONS
	});
};
