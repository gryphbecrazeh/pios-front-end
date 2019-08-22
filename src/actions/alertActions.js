import { GET_ALERTS, CLEAR_ALERTS } from "./types";
import { initialState } from "../reducers/keyReducer";
export const getAlerts = item => {
	let alerts = [];
	let { dbKeysList } = initialState;
	dbKeysList.forEach(key => {
		let flag = {};
		flag.key = key;
		flag.array = item.filter(
			order => order[key.value] === null || order[key.value] == false
		);
		flag.alert = flag.array == false ? false : true;
		alerts.push(flag);
	});
	return {
		type: GET_ALERTS,
		payload: alerts
	};
};
export const clearAlerts = () => {
	return {
		type: CLEAR_ALERTS
	};
};
