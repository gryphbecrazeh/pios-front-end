import { MODAL_TOGGLE, MODAL_ACTIVATE } from "../actions/types";

const initialState = {
	modals: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case MODAL_ACTIVATE:
			return () => {
				let currentModalsState = [...state.modals];
				let newModal = action.payload;
				currentModalsState[action.payload.modalID] = newModal;
				console.log(state);

				return {
					...state,
					modals: [...currentModalsState]
				};
			};
		case MODAL_TOGGLE: {
			let currentModalsState = [...state.modals];
			let newModal = currentModalsState[action.payload.modalID];
			newModal.status = !newModal.status;
			currentModalsState[action.payload.modalID] = newModal;
			console.log(state);
			return {
				...state,
				modals: [...currentModalsState]
			};
		}
		default:
			return state;
	}
}
