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
import ProductCard from "../components/receivingManager/productCard";
// ----------------------------Redux-------------------------------------------
import { connect } from "react-redux";
import { getFilters, addFilter } from "../actions/filterActions";
import { getItems } from "../actions/itemActions";
import { getOrderedSkus } from "../actions/orderedSkuActions";
import PropTypes from "prop-types";

class ReceivingManagerPage extends Component {
	state = {};
	componentDidMount() {
		this.props.getOrderedSkus();
	}
	render() {
		let brands = new Set();
		let totalProducts = 0;
		this.props.orderedSkus.forEach(product => {
			brands.add(product.brand);
			totalProducts += Number(product.skus_quantity || 0);
		});
		let brandsList = "";
		brands.forEach(brand => (brandsList += ` ${brand}`));
		return (
			<div>
				<Container fluid>
					<Row>
						<Col>Ordered Skus Pending Arrival</Col>
					</Row>
					<Row>
						<Col>
							Awaiting {totalProducts} products from
							{brandsList}
						</Col>
					</Row>
					{/* <Row className="mb-2">
						<Col>
							<AlertsContainer alerts={this.props.alerts} />
						</Col>
					</Row> */}
					<div className="ordered-sku-container">
						{this.props.orderedSkus
							// Add items to this screen when the order has been sent to the vendor, only things pending reception will show here
							// .filter(item => item.shipmentStatus === "Sent to Vendor")
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

ReceivingManagerPage.propTypes = {
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
	{ getFilters, addFilter, getItems, getOrderedSkus }
)(ReceivingManagerPage);
