// ----------------------------React-------------------------------------------
import React, { Component, Fragment } from "react";
// ----------------------------NPM-------------------------------------------
import { Row, Col, Container } from "reactstrap";
// ----------------------------Components-------------------------------------------
import ReadyOrdersList from "../components/orderManager/ReadyOrdersList";
import OrderModal from "../components/OrderModal";
import TableGenerator from "../components/TableGenerator";
import "react-datepicker/src/stylesheets/datepicker.scss";
import Filters from "../components/Filters";
import AlertsContainer from "../components/AlertsContainer";
import ProductCard from "../components/orderManager/productCard";
import MobileSearchBar from "../components/MobileSearchBar";
import OrderedSkuList from "../components/orderManager/OrderedSkuList";
// ----------------------------Redux-------------------------------------------
import { connect } from "react-redux";
import { getFilters, addFilter } from "../actions/filterActions";
import { getItems } from "../actions/itemActions";
import { getOrderedSkus } from "../actions/orderedSkuActions";
import { getAlerts, clearAlerts } from "../actions/alertActions";
import PropTypes from "prop-types";

class OrderManagerPage extends Component {
	state = {};
	componentDidMount() {
		this.props.clearAlerts();
		// Get items from the server if their status is ready to ship
		this.props.getItems(this.props.filters, item => {
			let newItem = item.filter(order =>
				order.orderStatus.find(status => status === "Ready to ship to Customer")
			);
			this.props.getAlerts([...newItem]);
		});

		let products = this.props.orderedSkus.filter(
			item => item.shipmentStatus === "Pending"
		);
	}
	render() {
		let brands = new Set();
		let totalProducts = 0;
		let products = this.props.orderedSkus.filter(
			item => item.shipmentStatus === "Pending"
		);
		let orders = this.props.item.customerOrders.filter(order =>
			order.orderStatus.find(status => status === "Ready to ship to Customer")
		);

		products.forEach(product => {
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
							{/* Filter results to only show shipping related alerts */}
							<AlertsContainer alerts={this.props.alerts} />
						</Col>
					</Row>
					<Row>
						<Col>
							<OrderedSkuList
								products={products}
								filters={this.props.filters}
							/>
						</Col>
						<Col>
							<ReadyOrdersList orders={orders} products={products} />
						</Col>
					</Row>
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
	{ getFilters, addFilter, getItems, getOrderedSkus, getAlerts, clearAlerts }
)(OrderManagerPage);
