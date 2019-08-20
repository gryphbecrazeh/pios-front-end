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
	renderOrders = item => {
		return this.search(
			this.filterByDateRange(
				this.state.sortTarget === "date"
					? this.sortByDate(item)
					: this.sortByTarget(item),
				Date(this.state.startDate),
				Date(this.state.endDate)
			)
		);
	};
	sortByDate = item => {
		return item.sort((a, b) => {
			return this.state.sort === false
				? new Date(a.date) - new Date(b.date)
				: new Date(b.date) - new Date(a.date);
		});
	};
	sortByTarget = item => {
		return item.sort((a, b) => {
			return this.state.sort === false
				? a[this.state.sortTarget] - b[this.state.sortTarget]
				: b[this.state.sortTarget] - a[this.state.sortTarget];
		});
	};
	onChangeDate = (target, e) => {
		if (target === "start") {
			this.setState({ startDate: new Date(e) });
		} else {
			this.setState({ endDate: new Date(e) });
		}
	};
	filterByDateRange = (item, range1, range2) => {
		let arrangeDates = new Date(range2) > new Date(range1);
		let start = arrangeDates === true ? new Date(range1) : new Date(range2);
		let end = arrangeDates === true ? new Date(range2) : new Date(range1);
		return item.filter(
			item => new Date(item.date) >= start && new Date(item.date) <= end
		);
	};
	toggleSort = e => {
		this.setState({
			sort: !this.state.sort,
			sortTarget: e.target.name
		});
	};
	onChangeSearch = e => {
		this.setState({
			searchQuery: e.target.value ? e.target.value : false
		});
	};
	onChangeSeachCriteria = e => {
		let critera = this.props.keys.dbKeysList.filter(
			item => item.value === e.target.value
		)[0];
		this.setState({
			searchTarget: critera.value,
			searchTargetLabel: critera
		});
	};
	search = item => {
		return item.filter(order =>
			order[this.state.searchTarget].match(
				new RegExp(
					`${this.state.searchQuery === false ? ".+" : this.state.searchQuery}`,
					"gmi"
				)
			)
		);
	};
	onToggleDropdown = () => {
		this.setState({
			dropdownOpen: !this.state.dropdownOpen
		});
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

					<Row>
						<Col md="6">
							<Dropdown
								isOpen={this.state.dropdownOpen}
								toggle={this.onToggleDropdown}
							>
								<DropdownToggle caret>{`Search By ${
									this.state.searchTargetLabel
								}`}</DropdownToggle>
								<DropdownMenu>
									<DropdownItem
										value="name"
										onClick={this.onChangeSeachCriteria}
									>
										Customer Name
									</DropdownItem>
								</DropdownMenu>
							</Dropdown>
							<Input
								onChange={this.onChangeSearch}
								name="search"
								placeholder="Search for an order"
							/>
							<Label>Sort By Date range</Label>
						</Col>
					</Row>
					<Row>
						<Col>
							<Datepicker
								selected={this.state.startDate}
								onChange={this.onChangeDate.bind(this, "start")}
							/>
							<Datepicker
								selected={this.state.endDate}
								onChange={this.onChangeDate.bind(this, "end")}
							/>
						</Col>
					</Row>
				</Container>
				<OrderModal />
				<div className="table-container" style={{ overflow: "scroll" }}>
					<TableGenerator
						orders={this.renderOrders(customerOrders)}
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
