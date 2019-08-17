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
		{ label: "Order Date", value: "date", sortable: true, type: "date" },
		{ label: "Recipient State", value: "st" },
		{ label: "Manufacturer", value: "mfr" },
		{ label: "Sent To", value: "sentTo" },
		{
			label: "Customer Due",
			value: "custDue",
			sortable: true,
			type: "integer"
		},
		{
			label: "Customer Paid Date",
			value: "custPaidDate",
			sortable: true,
			type: "date"
		},
		{ label: "Net Due", value: "netDue", sortable: true, type: "integer" },
		{
			label: "Net Paid Date",
			value: "netPaidDate",
			sortable: true,
			type: "date"
		},
		{ label: "Disclaim", value: "disclaim" },
		{
			label: "Addr Check",
			value: "addrCheck",
			sortable: true,
			type: "boolean"
		},
		{ label: "Received", value: "rcvd", sortable: true, type: "date" },
		{ label: "Ship", value: "ship" },
		{ label: "Shipped", value: "shipped", sortable: true, type: "date" },
		{ label: "Order Total", value: "total", sortable: true, type: "integer" },
		{ label: "NYS Tax", value: "nysTax", sortable: true, type: "integer" },
		{ label: "CA Tax", value: "caTax", sortable: true, type: "integer" },
		{ label: "Net", value: "net", sortable: true, type: "integer" },
		{ label: "Net Crate", value: "netCrate", sortable: true, type: "integer" },
		{
			label: "Net Freight",
			value: "netFreight",
			sortable: true,
			type: "integer"
		},
		{ label: "Notes", value: "notes" },
		{
			label: "Customer Paid",
			value: "custPaid",
			sortable: true,
			type: "integer"
		},
		{ label: "Net Paid", value: "netPaid", sortable: true, type: "integer" },
		{
			label: "NYS Taxes Paid",
			value: "nysTaxPaid",
			sortable: true,
			type: "integer"
		},
		{
			label: "CA Taxes Paid",
			value: "caTaxPaid",
			sortable: true,
			type: "integer"
		}
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
