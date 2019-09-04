// ----------------------------React-------------------------------------------
import React, { Component, Fragment } from "react";
// ----------------------------NPM-------------------------------------------
import { Row, Col, Container } from "reactstrap";
// ----------------------------Components-------------------------------------------
import OrderModal from "../components/OrderModal";
import TableGenerator from "../components/TableGenerator";
import "react-datepicker/src/stylesheets/datepicker.scss";
import Filters from "../components/Filters";
import AlertsContainer from "../components/AlertsContainer";
import ProductCard from "../components/orderManager/productCard";
import MobileSearchBar from "../components/MobileSearchBar";
// ----------------------------Redux-------------------------------------------
import { connect } from "react-redux";
import { getFilters, addFilter } from "../actions/filterActions";
import { getItems } from "../actions/itemActions";
import { getOrderedSkus } from "../actions/orderedSkuActions";
import { getAlerts } from "../actions/alertActions";
import PropTypes from "prop-types";

class OrderManagerPage extends Component {
	state = {};
	componentDidMount() {
		this.props.getOrderedSkus();
		let orders = this.props.orderedSkus.filter(
			item => item.shipmentStatus === "Pending"
		);
		this.props.getAlerts(orders);
	}
	render() {
		let brands = new Set();
		let totalProducts = 0;
		let orders = this.props.orderedSkus.filter(
			item => item.shipmentStatus === "Pending"
		);
		console.log(orders);

		orders.forEach(product => {
			brands.add(product.brand);
			totalProducts += Number(product.skus_quantity || 0);
		});
		let brandsList = "";
		brands.forEach(brand => (brandsList += ` ${brand}`));
		return (
			<div>
				<Container fluid>
					<Row>
						<Col>
							<MobileSearchBar />
						</Col>
					</Row>
					<Row
						className="mb-2"
						// style={{ position: "sticky", top: "5em", zIndex: 300 }}
					>
						<Col>
							<strong>{totalProducts}</strong> products from
							{brandsList} brands need to be checked and ordered
						</Col>
						<Col>
							<AlertsContainer alerts={this.props.alerts} />
						</Col>
					</Row>
					<div className="ordered-sku-container">
						{orders
							// Add items to this screen when the order has been sent to the vendor, only things pending reception will show here
							.filter(item => {
								let { productSearchQuery } = this.props.filters;
								return (
									item.brand.match(new RegExp(productSearchQuery, "gmi")) ||
									item.sku.match(new RegExp(productSearchQuery, "gmi"))
								);
							})
							.map(item => (
								<Row className="mb-2">
									<Col>
										<ProductCard product={item} />
									</Col>
								</Row>
							))}
					</div>
				</Container>
			</div>
		);
	}
}

OrderManagerPage.propTypes = {
	item: PropTypes.object.isRequired,
	getFilters: PropTypes.func.isRequired,
	filters: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	item: state.item,
	keys: state.keys,
	filters: state.filters,
	alerts: state.alerts.alerts,
	orderedSkus: state.orderedSkus.orderedSkus
});

export default connect(
	mapStateToProps,
	{ getFilters, addFilter, getItems, getOrderedSkus, getAlerts }
)(OrderManagerPage);
