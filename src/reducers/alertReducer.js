import { GET_ALERTS, CLEAR_ALERTS } from "../actions/types";

const initialstate = {
	alerts: []
};

export default function(state = initialstate, action) {
	switch (action.type) {
		case GET_ALERTS:
			return {
				...state,
				alerts: [...action.payload]
			};
		case CLEAR_ALERTS:
			return {
				...state,
				alerts: []
			};
		default:
			return {
				...state
			};
	}
}
