import { GET_ALERTS, CLEAR_ALERTS } from "../actions/types";

const initialstate = {
	alerts: [],
	shipping: []
};

export default function(state = initialstate, action) {
	switch (action.type) {
		case GET_ALERTS: {
			return {
				...state,
				shipping: [...action.payload.shipping],
				alerts: [...action.payload.all]
			};
		}
		case CLEAR_ALERTS:
			return {
				...state,
				alerts: [],
				shipping: []
			};
		default:
			return {
				...state
			};
	}
}
