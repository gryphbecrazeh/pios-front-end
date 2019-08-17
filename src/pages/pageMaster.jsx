import React, { Component } from "react";
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
import "react-datepicker/dist/react-datepicker.css";
// ----------------------------Redux-------------------------------------------
import { connect } from "react-redux";
import { getItems, deleteItem, getDBKeys } from "../actions/itemActions";
import PropTypes from "prop-types";

class MasterPage extends Component {
	state = {
		sort: true,
		sortTarget: "date",
		endDate: Date.now(),
		startDate: "",
		searchQuery: false,
		searchTarget: "name",
		searchTargetLabel: "Customer Name",
		dropdownOpen: false
	};
	componentDidMount() {
		this.props.getItems();
		const { customerOrders } = this.props.item;
		let d = new Date();
		d.setDate(d.getDate() - 14);
		this.setState({ startDate: d, orders: customerOrders });
	}
	renderOrders = item => {
		return this.search(
			this.filterByDateRange(
				this.state.sortTarget === "date"
					? this.sortByDate(item)
					: this.sortByTarget(item),
				this.state.startDate,
				this.state.endDate
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
		return (
			<div className="page-container">
				<Form>
					<FormGroup>
						<Container>
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
					</FormGroup>
				</Form>
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
	getItems: PropTypes.func.isRequired,
	item: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	item: state.item,
	keys: state.keys
});

export default connect(
	mapStateToProps,
	{ getItems, deleteItem, getDBKeys }
)(MasterPage);
