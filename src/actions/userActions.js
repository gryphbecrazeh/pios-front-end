import axios from "axios";
import { GET_USERS, ADD_USER, DELETE_USER, EDIT_USER } from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";
export const getUsers = () => (dispatch, getState) => {
	axios
		.get("/api/users")
		.then(res =>
			dispatch({
				type: GET_USERS,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
};
export const addUser = user => (dispatch, getState) => {
	axios
		.post("/api/users", user, tokenConfig(getState))
		.then(res =>
			dispatch({
				type: ADD_USER,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
};
export const editUser = user => (dispatch, getState) => {
	axios
		.put(`/api/users/${user._id}`, {
			id: user._id,
			name: user.name,
			email: user.email,
			password: user.password
		})
		.then(res => {
			dispatch({
				type: EDIT_USER,
				payload: res.data
			});
		})
		.catch(err =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
};

export const deleteUser = id => (dispatch, getState) => {
	axios
		.delete(`/api/users/${id}`, tokenConfig(getState))
		.then(res =>
			dispatch({
				type: DELETE_USER,
				payload: id
			})
		)
		.catch(err =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
};
