import React, { Component, Fragment } from "react";
import {
	Label,
	Form,
	FormGroup,
	Container,
	Row,
	Input,
	Col,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownToggle
} from "reactstrap";
// ----------------------------Components-------------------------------------------
import OrderModal from "../components/OrderModal";
import TableGenerator from "../components/TableGenerator";
import Datepicker from "react-datepicker";
import "react-datepicker/src/stylesheets/datepicker.scss";
import Filters from "../components/Filters";
import AlertsContainer from "../components/AlertsContainer";
// ----------------------------Redux-------------------------------------------
import { connect } from "react-redux";
import { getFilters, addFilter } from "../actions/filterActions";
import PropTypes from "prop-types";

class ShippingPage extends Component {
	state = {
		sort: true,
		sortTarget: "date",
		endDate: this.props.filters.sortEnd || Date.now(),
		startDate: this.props.filters.sortStart || new Date("01/01/2016"),
		searchQuery: this.props.filters.searchQuery || null,
		searchTarget: "name",
		searchTargetLabel: "Customer Name",
		dropdownOpen: false,
		alerts: [],
		tableKeys: [
			"date",
			"orderStatus",
			"orderNum",
			"name",
			"st",
			"mfr",
			"sentTo",
			"addrCheck",
			"rcvd",
			"ship",
			"shipped",
			"netCrate",
			"netFreight"
		],
		generatedReports: false
	};
	render() {
		const renderAlerts = (
			<Fragment>
				<AlertsContainer
					alerts={this.props.alerts.filter(alert =>
						this.state.tableKeys.find(key => key === alert.key.value)
					)}
				/>
			</Fragment>
		);
		let { customerOrders } = this.props.item;

		return (
			<div className="page-container">
				<Row>
					<Col>
						<Filters />
						<OrderModal />
					</Col>
					<Col>{renderAlerts}</Col>
				</Row>
				<TableGenerator
					pageKeys={this.state.tableKeys}
					orders={
						customerOrders && customerOrders.length > 0
							? customerOrders.filter(item =>
									item.orderStatus.find(
										status => status === "Ready to ship to Customer"
									)
							  )
							: []
					}
				/>
			</div>
		);
	}
}

ShippingPage.propTypes = {
	item: PropTypes.object.isRequired,
	getFilters: PropTypes.func.isRequired,
	filters: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	item: state.item,
	keys: state.keys,
	filters: state.filters,
	alerts: state.alerts.shipping
});

export default connect(
	mapStateToProps,
	{ getFilters, addFilter }
)(ShippingPage);
