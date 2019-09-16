import axios from "axios";

import {
	GET_SHIPMENTS,
	ADD_SHIPMENT,
	EDIT_SHIPMENT,
	DELETE_SHIPMENT,
	CLEAR_SHIPMENTS,
	CLEAR_ACTIONS
} from "./types";

import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const getShipments = then => (dispatch, getState) => {
	axios
		.get("/api/shipments", tokenConfig(getState))
		.then(res => {
			dispatch({
				type: GET_SHIPMENTS,
				payload: res.data
			});
			if (then) then();
		})
		.catch(err =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
};
export const addShipment = (item, then) => (dispatch, getState) => {
	axios
		.post("/api/shipments", item, tokenConfig(getState))
		.then(res => {
			dispatch({ type: ADD_SHIPMENT, payload: res.data });
			if (then) then();
		})
		.catch(err =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
};
// export const editShipment =(item, then)=>()
