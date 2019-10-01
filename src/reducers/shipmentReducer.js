import {
	GET_SHIPMENTS,
	EDIT_SHIPMENT,
	ADD_SHIPMENT,
	DELETE_SHIPMENT
} from "../actions/types";

import { getAlerts } from "../actions/alertActions";

const initialState = {
	shipments: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_SHIPMENTS: {
			return {
				...state,
				shipments: action.payload.shipments,
				success: action.payload.success,
				loading: false
			};
		}
		case EDIT_SHIPMENT: {
			return {
				...state,
				...action.payload
			};
		}
		case ADD_SHIPMENT: {
			return {
				...state,
				success: action.payload.success,
				shipments: [action.payload.shipment, ...state.shipments],
				loading: false
			};
		}
		case DELETE_SHIPMENT: {
			return {
				...state,
				success: action.payload.success,
				shipments: state.shipments.filter(
					shipment => shipment._id !== action.payload
				)
			};
		}
		default:
			return state;
	}
}
