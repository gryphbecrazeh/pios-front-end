import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
// ----------------------------Components-------------------------------------------
import PreLoad from "./components/PreLoad";
// ----------------------------Pages-------------------------------------------
// ----------------------------Redux-------------------------------------------
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";
class App extends Component {
	componentDidMount() {
		store.dispatch(loadUser());
	}
	render() {
		return (
			<Provider store={store}>
				<PreLoad />
			</Provider>
		);
	}
}

export default App;
