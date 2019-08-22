import {
	GET_KEYS,
	ADD_KEY,
	DELETE_KEYS,
	GET_DB_KEYS,
	ADD_DB_KEY,
	SAVE_DB_KEYS
} from "../actions/types";

export const initialState = {
	keys: [],
	dbKeys: [],
	dbKeysList: [
		{
			label: "Customer Name",
			value: "name",
			alert: "where no name has been entered",
			relatedKeys: []
		},
		{
			label: "Order Number",
			value: "orderNum",
			alert: "where no order number has been entered",
			relatedKeys: []
		},
		{
			label: "Order Date",
			value: "date",
			sortable: true,
			type: "date",
			alert: "where no order date has been entered",
			relatedKeys: []
		},
		{
			label: "Recipient State",
			value: "st",
			alert: "where no recipient state has been entered",
			relatedKeys: []
		},
		{
			label: "Manufacturer",
			value: "mfr",
			alert: "where no manufacturer has been entered",
			relatedKeys: []
		},
		{
			label: "Sent To",
			value: "sentTo",
			alert: "where the order(s) have not been sent to the shipper",
			relatedKeys: []
		},
		{
			label: "Customer Due",
			value: "custDue",
			sortable: true,
			type: "integer",
			payable: true,
			alert: "where the customer due amount has not been entered",
			relatedKeys: []
		},
		{
			label: "Customer Paid Date",
			value: "custPaidDate",
			sortable: true,
			type: "date",
			alert: "where the customer has a remaining balance",
			relatedKeys: []
		},
		{
			label: "Net Due",
			value: "netDue",
			sortable: true,
			type: "integer",
			payable: true,
			alert: "where the net due has not been entered",
			relatedKeys: []
		},
		{
			label: "Net Paid Date",
			value: "netPaidDate",
			sortable: true,
			type: "date",
			alert: "where the Net has not been paid",
			relatedKeys: []
		},
		{
			label: "Disclaim",
			value: "disclaim",
			alert: "where the disclaimer has not been sent",
			relatedKeys: []
		},
		{
			label: "Addr Check",
			value: "addrCheck",
			sortable: true,
			type: "boolean",
			alert: "where the recipient and billing addresses have not been checked",
			relatedKeys: []
		},
		{
			label: "Received",
			value: "rcvd",
			sortable: true,
			type: "date",
			alert: "where the order has not been recieved from the shipper",
			relatedKeys: []
		},
		{
			label: "Ship",
			value: "ship",
			alert: "where the order is not ready to ship",
			relatedKeys: []
		},
		{
			label: "Shipped",
			value: "shipped",
			sortable: true,
			type: "date",
			alert: "where the order has not been shipped",
			relatedKeys: []
		},
		{
			label: "Order Total",
			value: "total",
			sortable: true,
			type: "integer",
			alert: "where the order total has not been entered",
			relatedKeys: [
				"custDue",
				"custPaid",
				"nysTax",
				"caTax",
				"nysTaxPaid",
				"caTaxPaid",
				"net",
				"netPaid"
			]
		},
		{
			label: "NYS Tax",
			value: "nysTax",
			sortable: true,
			type: "integer",
			payable: true,
			alert: "where the NYS tax due has not been entered",
			relatedKeys: ["nysTaxPaid", "nysTaxPaidDate"]
		},
		{
			label: "CA Tax",
			value: "caTax",
			sortable: true,
			type: "integer",
			payable: true,
			alert: "where the CA tax due has not been entered",
			relatedKeys: ["caTaxPaid", "caTaxPaidDate"]
		},
		{
			label: "Net",
			value: "net",
			sortable: true,
			payable: true,
			type: "integer",
			alert: "where the Net value has not been entered",
			relatedKeys: ["netPaid", "netPaidDate"]
		},
		{
			label: "Net Crate",
			value: "netCrate",
			sortable: true,
			type: "integer",
			alert: "where the Net Crate has not been entered"
		},
		{
			label: "Net Freight",
			value: "netFreight",
			sortable: true,
			type: "integer",
			alert: "where the Net Freight has not been entered"
		},
		{ label: "Notes", value: "notes" },
		{
			label: "Customer Paid",
			value: "custPaid",
			sortable: true,
			payable: true,
			type: "integer",
			alert: "where the customer has not made a payment",
			relatedKeys: ["custDue", "custPaidDate"]
		},
		{
			label: "Net Paid",
			value: "netPaid",
			sortable: true,
			payable: false,
			type: "integer",
			alert: "where the Net has not been paid",
			relatedKeys: ["net", "netPaidDate"]
		},
		{
			label: "NYS Taxes Paid",
			value: "nysTaxPaid",
			sortable: true,
			payable: false,
			type: "integer",
			alert: "where the NYS taxes have not been paid",
			relatedKeys: ["nysTax", "nysTaxPaidDate"]
		},
		{
			label: "CA Taxes Paid",
			value: "caTaxPaid",
			sortable: true,
			payable: false,
			type: "integer",
			alert: "where the CA taxes have not been paid",
			relatedKeys: ["caTax", "caTaxPaidDate"]
		},
		{
			label: "CA Taxes Paid Date",
			value: "caTaxPaidDate",
			sortable: true,
			payable: false,
			type: "integer",
			relatedKeys: ["caTax", "caTaxPaid"]
		},

		{
			label: "Order Last Updated",
			value: "lastUpdated",
			sortable: true,
			type: "date"
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
