import { MODAL_ACTIVATE, MODAL_TOGGLE } from "./types";
export const activateModal = item => {
	return {
		type: MODAL_ACTIVATE,
		payload: item
	};
};
export const toggleModal = item => {
	return {
		type: MODAL_TOGGLE,
		payload: item
	};
};
