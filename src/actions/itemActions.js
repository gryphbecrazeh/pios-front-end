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
	ADD_DB_KEY
} from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";
export const getItems = () => (dispatch, getState) => {
	dispatch(setItemsLoading);
	axios
		.get("/api/items", tokenConfig(getState))
		.then(res =>{
			
			dispatch({
				type: GET_ITEMS,
				payload: res.data
			})
		}
		)
		.catch(err =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
};
export const addItem = item => (dispatch, getState) => {
	axios
		.post("/api/items", item, tokenConfig(getState))
		.then(res =>
			dispatch({
				type: ADD_ITEM,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
};

export const editItem = item => (dispatch, getState) => {
	console.log(item)
	let newItem = item;
	// delete newItem._id;
	delete newItem.msg;
	delete newItem.mode;
	delete newItem.required;

	axios
		.put(
			`/api/items/${item._id}`,
			{ id: item._id, order: newItem },
			tokenConfig(getState)
		)
		.then(res =>
			dispatch({
				type: EDIT_ITEM,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
};

export const deleteItem = id => (dispatch, getState) => {
	axios
		.delete(`/api/items/${id}`, tokenConfig(getState))
		.then(res =>
			dispatch({
				type: DELETE_ITEM,
				payload: id
			})
		)
		.catch(err =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
};
export const setItemsLoading = () => {
	return {
		type: ITEMS_LOADING
	};
};
export const clearItems = () => {
	return {
		type: ITEMS_CLEAR
	};
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