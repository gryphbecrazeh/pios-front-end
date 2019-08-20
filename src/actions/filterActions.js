import axios from "axios";
import {
	GET_FILTERS,
	ADD_FILTER,
	EDIT_FILTER,
	DELETE_FILTER,
	FILTERS_CLEAR,
	GET_ITEMS
} from "./types";

export const getFilters = () => (dispatch, getState) => {
	dispatch({
		type: GET_FILTERS
	});
};
export const addFilter = item => (dispatch, getState) => {
	dispatch({
		type: ADD_FILTER,
		payload: item
	});
	dispatch({
		type: GET_FILTERS
	});
};

export const editFilter = item => (dispatch, getState) => {
	return {
		type: EDIT_FILTER
	};
};

export const deleteFilter = id => (dispatch, getState) => {
	return {
		type: DELETE_FILTER
	};
};
export const clearFilters = () => (dispatch, getState) => {
	return {
		type: FILTERS_CLEAR
	};
};
