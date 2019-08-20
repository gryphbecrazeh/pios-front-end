import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
// ----------------------------Components-------------------------------------------
import AppNavBar from "./components/AppNavBar";
import PreLoad from "./components/PreLoad";
// ----------------------------Pages-------------------------------------------
import MasterPage from "./pages/pageMaster";
import ShippingPage from "./pages/pageShipping";
import TaxPage from "./pages/pageTax";
import WelcomePage from "./pages/pageWelcome";
import UserManagerPage from "./pages/pageUserManager";
// ----------------------------Redux-------------------------------------------
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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
