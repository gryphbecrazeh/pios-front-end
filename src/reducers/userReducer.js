import { GET_USERS, ADD_USER, DELETE_USER, EDIT_USER } from "../actions/types";

const initialState = {
	users: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_USERS:
			return {
				...state,
				users: action.payload
			};
		case ADD_USER:
			return {
				...state,
				users: [action.payload, ...state.users]
			};
		case EDIT_USER: {
			return {
				...state,
				users: action.payload
			};
		}
		case DELETE_USER:
			return {
				...state,
				users: state.users.filter(item => item._id !== action.payload)
			};
		default:
			return state;
	}
}
