import { combineReducers } from "redux";
import itemReducer from "./itemReducer";
import keyReducer from "./keyReducer";
import modalReducer from "./modalReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import filterReducer from "./filterReducer";
import paymentReducer from "./paymentReducer";
import alertReducer from "./alertReducer";
import productReducer from "./productReducer";
export default combineReducers({
	item: itemReducer,
	keys: keyReducer,
	modals: modalReducer,
	error: errorReducer,
	auth: authReducer,
	users: userReducer,
	filters: filterReducer,
	payments: paymentReducer,
	alerts: alertReducer,
	products: productReducer
});
