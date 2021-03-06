import React, { Component, Fragment } from "react";
import { Row, Col, Container } from "reactstrap";

// ----------------------------Components-------------------------------------------
import OrderModal from "../components/OrderModal";
import TableGenerator from "../components/TableGenerator";
import Filters from "../components/Filters";
import "react-datepicker/src/stylesheets/datepicker.scss";
import PageAlert from "../components/PageAlert";

// ----------------------------Redux-------------------------------------------
import { connect } from "react-redux";
import { getItems, deleteItem, getDBKeys } from "../actions/itemActions";
import { getPayments } from "../actions/paymentActions";
import { getAlerts, clearAlerts } from "../actions/alertActions";
import PropTypes from "prop-types";

class TaxPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			...this.props.filters,
			dropdownOpen: false,
			tableKeys: [
				"date",
				"orderNum",
				"name",
				"mfr",
				"sentTo",
				"custDue",
				"custPaidDate",
				"netDue",
				"netPaidDate",
				"total",
				"nysTax",
				"caTax",
				"net",
				"netCrate",
				"netFreight"
			]
		};
		this.props.clearAlerts();
		this.props.getAlerts(this.props.item.customerOrders);
	}

	onToggleDropdown = () => {
		this.setState({
			dropdownOpen: !this.state.dropdownOpen
		});
	};
	render() {
		const months = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December"
		];
		const renderAlerts = (
			<Fragment>
				<h4>Alerts:</h4>
				<div className="alert-container">
					{this.props.alerts
						.filter(alert => alert.alert === true)
						.filter(alert =>
							this.state.tableKeys.some(item => alert.key.value === item)
						)
						.map(alert => (
							<PageAlert alert={alert} />
						))}
				</div>
			</Fragment>
		);
		return (
			<div className="page-container">
				<Row>
					<Col>
						<Container>
							<Row className="mb-4">
								<Col>
									<Row>
										<Col>
											<h1>
												{"<"}
												{months[new Date().getMonth()]}
												{">"}
											</h1>
										</Col>
									</Row>
									<Row>
										<Col>
											Total Payments Tax Payments In{" "}
											{months[new Date().getMonth()]}
											...
										</Col>
									</Row>
									<Row>
										<Col>
											Total Payments NET Payments In{" "}
											{months[new Date().getMonth()]}
											...
										</Col>
									</Row>
									<Row>
										<Col>
											Total Payments Customer Payments In{" "}
											{months[new Date().getMonth()]}
											...
										</Col>
									</Row>
								</Col>
							</Row>
						</Container>
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

TaxPage.propTypes = {
	getItems: PropTypes.func.isRequired,
	item: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	item: state.item,
	keys: state.keys,
	payments: state.payments,
	filters: state.filters,
	alerts: state.alerts.alerts
});

export default connect(
	mapStateToProps,
	{ getItems, deleteItem, getDBKeys, getPayments, getAlerts, clearAlerts }
)(TaxPage);
