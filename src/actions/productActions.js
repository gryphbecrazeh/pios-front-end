import axios from "axios";
import {
	GET_PRODUCTS,
	EDIT_PRODUCT,
	ADD_PRODUCT,
	DELETE_PRODUCT
} from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";
export const getProducts = () => (dispatch, getState) => {
	axios
		.get("/api/products")
		.then(res => {
			dispatch({
				type: GET_PRODUCTS,
				payload: res.data
			});
		})
		.catch(err =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
};
export const addProduct = item => (dispatch, getState) => {
	axios
		.post("/api/products", item, tokenConfig(getState))
		.then(res =>
			dispatch({
				type: ADD_PRODUCT,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
};

export const editProduct = item => (dispatch, getState) => {
	let newItem = item;

	axios
		.put(
			`/api/products/${item._id}`,
			{ id: item._id, order: newItem },
			tokenConfig(getState)
		)
		.then(res =>
			dispatch({
				type: EDIT_PRODUCT,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
};

export const deleteProduct = id => (dispatch, getState) => {
	axios
		.delete(`/api/products/${id}`, tokenConfig(getState))
		.then(res =>
			dispatch({
				type: DELETE_PRODUCT,
				payload: id
			})
		)
		.catch(err =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
};
