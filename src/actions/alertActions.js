import { GET_ALERTS, CLEAR_ALERTS } from "./types";
import { initialState } from "../reducers/keyReducer";
export const getAlerts = (item = []) => (dispatch, getState) => {
	function generateAlerts(arr) {
		let alerts = [];
		let { dbKeysList } = initialState;
		dbKeysList.forEach(key => {
			let array = [...arr];
			let flag = {};
			flag.key = key;
			flag.array = array.filter(
				order =>
					key.warn === true &&
					(!order.hasOwnProperty(key.value) ||
						order[key.value] === null ||
						order[key.value] == false)
			);
			flag.alert = flag.array == false ? false : true;
			alerts.push(flag);
		});
		return alerts;
	}
	dispatch({
		type: GET_ALERTS,
		payload: {
			all: generateAlerts(item),
			shipping: generateAlerts(
				item.filter(order =>
					order.orderStatus.find(
						status => status === "Ready to ship to Customer"
					)
				)
			)
		}
	});
};
export const clearAlerts = () => (dispatch, getState) => {
	dispatch({
		type: CLEAR_ALERTS
	});
};
