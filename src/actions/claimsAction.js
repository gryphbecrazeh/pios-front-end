import axios from "axios";
import {
	GET_CLAIMS,
	ADD_CLAIM,
	DELETE_CLAIM,
	EDIT_CLAIM,
	CLEAR_CLAIMS,
	CLAIMS_CLEAR_ACTIONS
} from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const getClaims = id => (dispatch, getState) => {
	axios
		.get(`/api/claims/${id || null}`)
		.then(res => {
			dispatch({
				type: GET_CLAIMS,
				payload: res.data
			});
		})
		.catch(err =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
};
export const addClaim = item => (dispatch, getState) => {
	axios
		.post("/api/claims", item, tokenConfig(getState))
		.then(res => {
			dispatch({
				type: ADD_CLAIM,
				payload: res.data
			});
			dispatch(getClaims());
		})
		.catch(err =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
};

export const editClaim = item => (dispatch, getState) => {
	let newItem = item;

	axios
		.put(
			`/api/claims/${item._id}`,
			{ id: item._id, claim: newItem },
			tokenConfig(getState)
		)
		.then(res => {
			dispatch({
				type: EDIT_CLAIM,
				payload: res.data
			});
			dispatch(getClaims());
		})
		.catch(err =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
};

export const deleteClaim = id => (dispatch, getState) => {
	axios
		.delete(`/api/claims/${id}`, tokenConfig(getState))
		.then(res =>
			dispatch({
				type: DELETE_CLAIM,
				payload: id
			})
		)
		.catch(err =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
};
export const clearClaims = () => (dispatch, getState) => {
	dispatch({
		type: CLEAR_CLAIMS
	});
};
export const clearActions = () => (dispatch, getState) => {
	dispatch({
		type: CLAIMS_CLEAR_ACTIONS
	});
};
