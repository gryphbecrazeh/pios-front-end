import React, { Component, Fragment } from "react";
import {
	Label,
	Container,
	Row,
	Input,
	Col,
	Dropdown,
	DropdownItem,
	Button,
	DropdownMenu,
	DropdownToggle
} from "reactstrap";
// ----------------------------Components-------------------------------------------
import OrderModal from "../components/OrderModal";
import TableGenerator from "../components/TableGenerator";
import Datepicker from "react-datepicker";
import PageAlert from "../components/PageAlert";
import "react-datepicker/dist/react-datepicker.css";
import Filters from "../components/Filters";
// ----------------------------Redux-------------------------------------------
import { connect } from "react-redux";
import { getFilters, addFilter } from "../actions/filterActions";
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
			searchQuery: this.props.filters.searchQuery || null,
			searchTarget: "name",
			searchTargetLabel: "Customer Name",
			dropdownOpen: false,
			alerts: [],
			tableKeys: [
				"date",
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
				"netFreight",
				"notes"
			],
			generatedReports: false
		};
		this.props.addFilter({
			sortStart: new Date(this.state.startDate),
			sortEnd: new Date(this.state.endDate),
			searchQuery: this.state.searchQuery
		});
	}
	showAlerts = item => {
		this.setState({
			tableKeys: ["orderNum", "addrCheck"]
		});
	};
	getAlerts = () => {
		const { customerOrders } = this.props.item;
		let { dbKeysList } = this.props.keys;
		let ordersReady = customerOrders != false ? true : false;
		let ready = ordersReady && this.state.generatedReports === false;
		let alerts = [];
		if (ready) {
			dbKeysList.forEach(key => {
				let flag = {};
				flag.key = key;
				flag.array = customerOrders.filter(
					order => order[key.value] === null || order[key.value] == false
				);
				flag.alert = flag.array == false ? false : true;
				alerts.push(flag);
			});
			this.setState({
				generatedReports: true,
				alerts: [...alerts]
			});
		}
	};
	renderAlerts = () => {
		return (
			<div className="alert-container">
				{this.state.alerts
					.filter(alert => alert.alert === true)
					.map(alert => (
						<PageAlert alert={alert} />
					))}
			</div>
		);
	};
	render() {
		const { customerOrders } = this.props.item;
		const ShipNow = (
			<Fragment>
				<Col>
					<Button color="success">View now</Button>
				</Col>
			</Fragment>
		);
		this.getAlerts();
		return (
			<div className="page-container">
				<Row>
					<Col>
						<Filters />
						<OrderModal />
					</Col>
					<Col>{this.renderAlerts()}</Col>
				</Row>
				<div className="table-container" style={{ overflow: "scroll" }}>
					<TableGenerator pageKeys={this.state.tableKeys} />
				</div>
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
	filters: state.filters
});

export default connect(
	mapStateToProps,
	{ getFilters, addFilter }
)(MasterPage);
