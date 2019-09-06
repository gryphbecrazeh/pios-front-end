import {
	GET_FILTERS,
	ADD_FILTER,
	EDIT_FILTER,
	DELETE_FILTER,
	FILTERS_CLEAR
} from "./types";

export const getFilters = () => (dispatch, getState) => {
	dispatch({
		type: GET_FILTERS
	});
};
export const addFilter = (item, next) => (dispatch, getState) => {
	dispatch({
		type: ADD_FILTER,
		payload: item
	});
	if (next) next();
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
