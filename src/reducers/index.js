import { combineReducers } from "redux";
import itemReducer from "./itemReducer";
import keyReducer from "./keyReducer";
import modalReducer from "./modalReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
export default combineReducers({
	item: itemReducer,
	keys: keyReducer,
	modals: modalReducer,
	error: errorReducer,
	auth: authReducer,
	users: userReducer
});
