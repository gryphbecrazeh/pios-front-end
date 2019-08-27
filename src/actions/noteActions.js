import axios from "axios";
import {
	GET_NOTES,
	ADD_NOTE,
	EDIT_NOTE,
	DELETE_NOTE,
	CLEAR_NOTES
} from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const getNotes = id => (dispatch, getState) => {
	axios
		.get(`/api/notes/${id}`)
		.then(res => {
			dispatch({
				type: GET_NOTES,
				payload: res.data
			});
		})
		.catch(err =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
};
export const addNote = item => (dispatch, getState) => {
	console.log(item);
	axios
		.post("/api/notes", item, tokenConfig(getState))
		.then(res =>
			dispatch({
				type: ADD_NOTE,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
};

export const editNote = item => (dispatch, getState) => {
	let newItem = item;

	axios
		.put(
			`/api/notes/${item._id}`,
			{ id: item._id, note: newItem },
			tokenConfig(getState)
		)
		.then(res =>
			dispatch({
				type: EDIT_NOTE,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
};

export const deletePayment = id => (dispatch, getState) => {
	axios
		.delete(`/api/notes/${id}`, tokenConfig(getState))
		.then(res =>
			dispatch({
				type: DELETE_NOTE,
				payload: id
			})
		)
		.catch(err =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
};
export const clearNotes = () => (dispatch, getState) => {
	dispatch({
		type: CLEAR_NOTES
	});
};
