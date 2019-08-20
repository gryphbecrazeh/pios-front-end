import React, { Component } from "react";
import {
	Label,
	Container,
	Row,
	Input,
	Col,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	Button
} from "reactstrap";
// ----------------------------Components-------------------------------------------
import OrderModal from "../components/OrderModal";
import TableGenerator from "../components/TableGenerator";
import Filters from "../components/Filters";
import "react-datepicker/dist/react-datepicker.css";
// ----------------------------Redux-------------------------------------------
import { connect } from "react-redux";
import { getItems, deleteItem, getDBKeys } from "../actions/itemActions";
import { getPayments } from "../actions/paymentActions";
import PropTypes from "prop-types";

class TaxPage extends Component {
	constructor(props) {
		super(props);
		this.state = { ...this.props.filters, dropdownOpen: false, showAll: false };
	}

	onToggleDropdown = () => {
		this.setState({
			dropdownOpen: !this.state.dropdownOpen
		});
	};
	showAll = () => {
		this.setState({
			showAll: !this.state.showAll
		});
	};
	render() {
		let { customerOrders } = this.props.item;
		return (
			<div className="page-container">
				<Container style={{ position: "relative", zIndex: "1" }}>
					<Filters />
					<Row style={{ position: "relative", zIndex: "-1" }}>
						<Col>
							<h3>
								{customerOrders.filter(item => !item.nysTaxPaidDate).length}{" "}
								orders with unpaid NYS taxes...
							</h3>
						</Col>

						<Col>
							<Button color="danger">View now</Button>
						</Col>
					</Row>
					<Row>
						<Col>
							<h3>
								{customerOrders.filter(item => !item.caTaxPaidDate).length}{" "}
								orders with unpaid CA taxes...
							</h3>
						</Col>

						<Col>
							<Button color="danger">View now</Button>
						</Col>
					</Row>
					<Row>
						<Col>
							<h3>
								{customerOrders.filter(item => !item.netPaidDate).length} orders
								with unpaid NET...
							</h3>
						</Col>

						<Col>
							<Button color="danger">View now</Button>
						</Col>
					</Row>
					<Row>
						<Col>
							<h3>
								{customerOrders.filter(item => !item.custPaidDate).length}{" "}
								orders that were unpaid by the customer...
							</h3>
						</Col>

						<Col>
							<Button color="danger">View now</Button>
						</Col>
					</Row>

					<Row>
						<Col>
							<Button onClick={this.showAll}>
								{this.state.showAll === false
									? "Show All Orders"
									: "Show Filtered Orders"}
							</Button>
						</Col>
					</Row>
				</Container>
				<OrderModal />
				<div className="table-container" style={{ overflow: "scroll" }}>
					<TableGenerator
						filter="financial"
						warnDates={true}
						pageKeys={[
							"date",
							"orderNum",
							"name",
							"total",
							"nysTaxPaid",
							"caTaxPaid",
							"nysTax",
							"caTax",
							"st",
							"custDue",
							"custPaid",
							"custPaidDate",
							"net",
							"netDue",
							"netPaid",
							"netPaidDate",
							"netCrate",
							"netFreight",
							"rcvd",
							"shipped"
						]}
					/>
				</div>
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
	payments: state.payments
});

export default connect(
	mapStateToProps,
	{ getItems, deleteItem, getDBKeys, getPayments }
)(TaxPage);
