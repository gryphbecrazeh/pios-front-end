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
			dropdownOpen: false
		};
		this.props.addFilter({
			sortStart: new Date(this.state.startDate),
			sortEnd: new Date(this.state.endDate),
			searchQuery: this.state.searchQuery
		});
	}
	render() {
		const { customerOrders } = this.props.item;
		const ShipNow = (
			<Fragment>
				<Col>
					<Button color="success">View now</Button>
				</Col>
			</Fragment>
		);
		return (
			<div className="page-container">
				<Container>
					<Filters />
					<Row>
						<Col>
							<h3>
								{customerOrders.filter(item => item.readyToShip).length} orders
								ready to ship...{" "}
							</h3>
						</Col>
						{customerOrders.filter(item => item.readyToShip).length >= 1
							? ShipNow
							: null}
					</Row>

					<Row>
						<Col>
							<h3>
								{customerOrders.filter(item => !item.addrCheck === true).length}{" "}
								orders with unverified addresses...{" "}
							</h3>
						</Col>
						<Col>
							<Button color="danger">View now</Button>
						</Col>
					</Row>
					<Row>
						<Col>
							<h3>
								{customerOrders.filter(item => !item.addrCheck === true).length}{" "}
								orders with unassigned skus...{" "}
							</h3>
						</Col>
						<Col>
							<Button color="danger">View now</Button>
						</Col>
					</Row>
					<Row>
						<Col>
							<h3>
								{customerOrders.filter(item => !item.addrCheck === true).length}{" "}
								orders with unconfirmed stock status...{" "}
							</h3>
						</Col>
						<Col>
							<Button color="danger">View now</Button>
						</Col>
					</Row>
				</Container>
				<OrderModal />
				<div className="table-container" style={{ overflow: "scroll" }}>
					<TableGenerator
						pageKeys={[
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
						]}
					/>
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
