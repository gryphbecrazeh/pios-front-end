import {
	GET_KEYS,
	ADD_KEY,
	DELETE_KEYS,
	GET_DB_KEYS,
	ADD_DB_KEY,
	SAVE_DB_KEYS
} from "../actions/types";

const initialState = {
	keys: [],
	dbKeys: [],
	dbKeysList: [
		{ label: "Customer Name", value: "name" },
		{ label: "Order Number", value: "orderNum" },
		{ label: "Order Date", value: "date" },
		{ label: "Recipient State", value: "st" },
		{ label: "Manufacturer", value: "mfr" },
		{ label: "Sent To", value: "sentTo" },
		{ label: "Customer Due", value: "custDue" },
		{ label: "Customer Paid Date", value: "custPaidDate" },
		{ label: "Net Due", value: "netDue" },
		{ label: "Net Paid Date", value: "netPaidDate" },
		{ label: "Disclaim", value: "disclaim" },
		{ label: "Addr Check", value: "addrCheck" },
		{ label: "Received", value: "rcvd" },
		{ label: "Ship", value: "ship" },
		{ label: "Shipped", value: "shipped" },
		{ label: "Total", value: "total" },
		{ label: "NYS Tax", value: "nysTax" },
		{ label: "CA Tax", value: "caTax" },
		{ label: "Net", value: "net" },
		{ label: "Net Crate", value: "netCrate" },
		{ label: "Net Freight", value: "netFreigt" },
		{ label: "Notes", value: "notes" }
	]
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_KEYS:
			return {
				...state
			};
		case ADD_KEY:
			return {
				...state,
				keys: [action.payload, ...state.keys]
			};
		case DELETE_KEYS:
			return {
				...state,
				keys: []
			};
		case GET_DB_KEYS:
			return {
				...state,
				dbKeys: [...state.keys]
			};
		case SAVE_DB_KEYS:
			return {
				...state,
				dbKeys: [...action.payload]
			};
		case ADD_DB_KEY:
			return {
				...state,
				dbKeys: [action.payload, ...state.dbKeys]
			};

		default:
			return state;
	}
}
