import { GET_ITEMS, ADD_ITEM, DELETE_ITEM } from "../actions/types";

const initialState = {
	customerOrders: [
		{
			date: "01/01/2019",
			orderNum: "123456",
			name: "Chris",
			ST: "NY",
			mfr: "USR",
			sentTo: "KAS",
			custDue: "0",
			custPaidDate: "01/05/2019",
			netDue: "30",
			netPaidDate: "01/01/2019",
			disclaim: "",
			addrCheck: "LB",
			rcvd: "KAS",
			ship: "kitchenall",
			shipped: "-",
			total: 78.38,
			nysTax: 0,
			caTax: 0
		},
		{
			date: "01/01/2019",
			orderNum: "123456",
			name: "Chris",
			ST: "NY",
			mfr: "USR",
			sentTo: "KAS",
			custDue: "0",
			custPaidDate: "01/05/2019",
			netDue: "30",
			netPaidDate: "01/01/2019",
			disclaim: "",
			addrCheck: "LB",
			rcvd: "KAS",
			ship: "kitchenall",
			shipped: "-",
			total: 78.38,
			nysTax: 0,
			caTax: 0
		},
		{
			date: "01/01/2019",
			orderNum: "123456",
			name: "Chris",
			ST: "NY",
			mfr: "USR",
			sentTo: "KAS",
			custDue: "0",
			custPaidDate: "01/05/2019",
			netDue: "30",
			netPaidDate: "01/01/2019",
			disclaim: "",
			addrCheck: "LB",
			rcvd: "KAS",
			ship: "kitchenall",
			shipped: "-",
			total: 78.38,
			nysTax: 0,
			caTax: 0
		},
		{
			date: "01/01/2019",
			orderNum: "123456",
			name: "Chris",
			ST: "NY",
			mfr: "USR",
			sentTo: "KAS",
			custDue: "0",
			custPaidDate: "01/05/2019",
			netDue: "30",
			netPaidDate: "01/01/2019",
			disclaim: "",
			addrCheck: "LB",
			rcvd: "KAS",
			ship: "kitchenall",
			shipped: "-",
			total: 78.38,
			nysTax: 0,
			caTax: 0
		}
	]
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_ITEMS:
			return {
				...state
			};
		default:
			return state;
	}
}
