import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// ----------------------------Components-------------------------------------------
import AppNavBar from "./AppNavBar";
// ----------------------------Pages-------------------------------------------
import MasterPage from "../pages/pageMaster";
import ShippingPage from "../pages/pageShipping";
import TaxPage from "../pages/pageTax";
import WelcomePage from "../pages/pageWelcome";
import UserManagerPage from "../pages/pageUserManager";
// ----------------------------Redux-------------------------------------------
import { connect } from "react-redux";
import { getItems } from "../actions/itemActions";
import { getFilters, addFilter } from "../actions/filterActions";
import { getOrderedSkus } from "../actions/orderedSkuActions";
import { getProducts } from "../actions/productActions";
import PropTypes from "prop-types";
import ProductPage from "../pages/pageProducts";
import ReceivingManagerPage from "../pages/pageReceivingManager";
import OrderManagerPage from "../pages/pageOrderManager";

class PreLoad extends Component {
	constructor(props) {
		super(props);
		// Here for now
		this.props.getOrderedSkus();
		this.props.getProducts();
		this.state = {
			filters: this.props.filters
		};
	}
	render() {
		return (
			<Router>
				<Switch>
					<div className="App">
						<AppNavBar />
						<Route path="/product-manager" component={ProductPage} />
						<Route path="/" exact component={WelcomePage} />
						<Route path="/master-page" component={MasterPage} />
						<Route path="/shipping-page" component={ShippingPage} />
						<Route path="/financial-page" component={TaxPage} />
						<Route path="/user-manager" component={UserManagerPage} />
						<Route path="/receiving-manager" component={ReceivingManagerPage} />
						<Route path="/order-manager" component={OrderManagerPage} />
					</div>
				</Switch>
			</Router>
		);
	}
}

PreLoad.propTypes = {
	getItems: PropTypes.func.isRequired,
	item: PropTypes.object.isRequired,
	getFilters: PropTypes.func.isRequired,
	filters: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	filters: state.filters,
	keys: state.keys,
	item: state.item,
	auth: state.auth
});

export default connect(
	mapStateToProps,
	{ getItems, getFilters, addFilter, getProducts, getOrderedSkus }
)(PreLoad);
