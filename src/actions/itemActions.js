import axios from "axios";
import {
	GET_ITEMS,
	ADD_ITEM,
	EDIT_ITEM,
	DELETE_ITEM,
	ITEMS_LOADING,
	ITEMS_CLEAR,
	GET_KEYS,
	ADD_KEY,
	DELETE_KEYS,
	GET_DB_KEYS,
	SAVE_DB_KEYS,
	ADD_DB_KEY,
	GET_FILTERS,
	GET_ALERTS,
	CLEAR_ACTIONS
} from "./types";
import { tokenConfig } from "./authActions";
import { getAlerts } from "./alertActions";
import { returnErrors } from "./errorActions";
export const getItems = (filters, then) => (dispatch, getState) => {
	let sendFilters = !filters
		? null
		: {
				...filters,
				sortStart: new Date(filters.sortStart).toDateString(),
				sortEnd: new Date(filters.sortEnd).toDateString()
		  };

	let params = sendFilters
		? {
				params: {
					sendFilters
				}
		  }
		: null;
	dispatch({ type: GET_FILTERS });
	dispatch(setItemsLoading);
	axios
		.get("/api/items", params, tokenConfig(getState))
		.then(res => {
			dispatch({
				type: GET_ITEMS,
				payload: res.data
			});
			if (then) {
				then(res.data.items);
			}
		})
		.catch(err =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
};
export const addItem = (item, then) => (dispatch, getState) => {
	axios
		.post("/api/items", item, tokenConfig(getState))
		.then(res => {
			dispatch({
				type: ADD_ITEM,
				payload: res.data
			});
			if (then) then();
		})
		.catch(err =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
};

export const editItem = (item, then) => (dispatch, getState) => {
	let newItem = item;
	newItem.lastUpdated = Date();
	axios
		.put(
			`/api/items/${item._id}`,
			{ id: item._id, order: newItem },
			tokenConfig(getState)
		)
		.then(res => {
			dispatch({
				type: EDIT_ITEM,
				payload: res.data
			});
			if (then) then();
		})
		.catch(err => {
			dispatch(returnErrors(err.response.data, err.response.status));
		});
};

export const deleteItem = (id, then) => (dispatch, getState) => {
	axios
		.delete(`/api/items/${id}`, tokenConfig(getState))
		.then(res => {
			dispatch({
				type: DELETE_ITEM,
				payload: id
			});
			if (then) then();
		})
		.catch(err =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
};
export const setItemsLoading = () => (dispatch, getState) => {
	dispatch({
		type: ITEMS_LOADING
	});
};
export const clearItems = then => (dispatch, getState) => {
	dispatch({
		type: ITEMS_CLEAR
	});
	if (then) then();
};
export const clearActions = then => (dispatch, getState) => {
	dispatch({
		type: CLEAR_ACTIONS
	});
	if (then) then();
};
// KEYS ACTIONS
// SHOULD GO IN keysActions.js

export const getKeys = () => {
	return {
		type: GET_KEYS
	};
};
export const addKey = item => {
	return {
		type: ADD_KEY,
		payload: item
	};
};
export const getDBKeys = keys => {
	return {
		type: GET_DB_KEYS
	};
};
export const saveDBKeys = item => {
	return {
		type: SAVE_DB_KEYS,
		payload: item
	};
};
export const addDBKey = item => {
	return {
		type: ADD_DB_KEY,
		payload: item
	};
};

export const deleteKeys = () => {
	return {
		type: DELETE_KEYS
	};
};
