import React, { Component, Fragment } from "react";
import { Row, Col, Card, CardBody, CardHeader } from "reactstrap";
// ----------------------------Components-------------------------------------------
import OrderModal from "../components/OrderModal";
import TableGenerator from "../components/TableGenerator";
import PageAlert from "../components/PageAlert";
import "react-datepicker/src/stylesheets/datepicker.scss";
import Filters from "../components/Filters";
import AlertsContainer from "../components/AlertsContainer";
// ----------------------------Redux-------------------------------------------
import { connect } from "react-redux";
import { getFilters, addFilter } from "../actions/filterActions";
import { getItems } from "../actions/itemActions";
import PropTypes from "prop-types";

class MasterPage extends Component {
	constructor(props) {
		super(props);
		this.props.getFilters();
		this.state = {
			sort: true,
			sortTarget: "date",
			endDate: this.props.filters.sortEnd || Date.now(),
			startDate: this.props.filters.sortStart || new Date("01/01/2016"),
			searchQuery: this.props.filters.searchQuery || "",
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
				"custDue",
				"custPaidDate",
				"netDue",
				"netPaidDate",
				"disclaim",
				"addrCheck",
				"rcvd",
				"ship",
				"shipped",
				"total",
				"nysTax",
				"caTax",
				"net",
				"netCrate",
				"netFreight"
			],
			generatedReports: false
		};
		this.props.addFilter({
			sortStart: new Date(this.state.startDate),
			sortEnd: new Date(this.state.endDate),
			searchQuery: this.state.searchQuery
		});
	}
	componentDidMount() {}
	showAlerts = item => {
		this.setState({
			tableKeys: ["orderNum", "addrCheck"]
		});
	};
	render() {
		const renderAlerts = (
			<Fragment>
				<AlertsContainer alerts={this.props.alerts} />
			</Fragment>
		);

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
					orders={this.props.item.customerOrders}
				/>
			</div>
		);
	}
}

MasterPage.propTypes = {
	item: PropTypes.object.isRequired,
	getFilters: PropTypes.func.isRequired,
	filters: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	item: state.item,
	keys: state.keys,
	filters: state.filters,
	alerts: state.alerts.alerts
});

export default connect(
	mapStateToProps,
	{ getFilters, addFilter, getItems }
)(MasterPage);
