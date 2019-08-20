import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AppNavBar from "./components/AppNavBar";
import MasterPage from "./pages/pageMaster";
import ShippingPage from "./pages/pageShipping";
import TaxPage from "./pages/pageTax";
import WelcomePage from "./pages/pageWelcome";
import UserManagerPage from "./pages/pageUserManager";
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
				<Router>
					<Switch>
						<div className="App">
							<AppNavBar />
							<Route path="/" exact component={WelcomePage} />
							<Route path="/master-page" component={MasterPage} />
							<Route path="/shipping-page" component={ShippingPage} />
							<Route path="/tax-page" component={TaxPage} />
							<Route path="/user-manager" component={UserManagerPage} />
						</div>
					</Switch>
				</Router>
			</Provider>
		);
	}
}

export default App;
