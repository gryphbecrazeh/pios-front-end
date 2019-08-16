import React, { Component } from "react";
import {
	Table,
	Button,
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
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// ----------------------------Components-------------------------------------------
import OrderModal from "../components/OrderModal";
import OrderDetails from "../components/customerOrderDetails";

// ----------------------------Redux-------------------------------------------
import { connect } from "react-redux";
import { getItems, deleteItem, getDBKeys } from "../actions/itemActions";
import PropTypes from "prop-types";

class TaxPage extends Component {
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
		let d = new Date();
		d.setDate(d.getDate() - 14);
		this.setState({ startDate: d });
		this.props.getItems();
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
				<h1>State Tax</h1>
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
					<Table id="master-customer-details">
						<thead>
							<tr className="text-center text-nowrap">
								<th code="edit" className="">
									Edit
								</th>
								<th code="order-date">
									<Button name="date" onClick={this.toggleSort}>
										Order Date
									</Button>
								</th>
								<th code="order-number">Order Number</th>
								<th code="customer-name">Customer Name</th>
								<th code="order-st">Recipient State</th>
								<th code="order-mfr">Manufacturer</th>
								<th code="order-sent-to">Sent To</th>
								<th code="customer-due">Customer Owes</th>
								<th code="customer-paid-date">Customer Paid Date</th>
								<th code="ka-net-due">KA Net Due</th>
								<th code="ka-net-paid-date">KA Net Paid Date</th>
								<th code="order-disclaim">DISCLAIM</th>
								<th code="order-addr-check">ADDR CHECK</th>
								<th code="order-rcvd">RCVD</th>
								<th code="order-ship">SHIP</th>
								<th code="order-shipped">SHIPPED</th>
								<th code="order-total">TOTAL</th>
								<th code="order-ny-tax">NYS TAX</th>
								<th code="order-ca-tax">CA TAX</th>
								<th code="order-net">NET</th>
								<th code="order-net-crate">NET CRATE</th>
								<th code="order-net-freight">NET FREIGHT</th>
								<th code="order-notes">NOTES</th>
							</tr>
						</thead>
						<tbody id="table-result-container">
							{this.renderOrders(customerOrders).map(item => {
								return <OrderDetails order={item} />;
							})}
						</tbody>
					</Table>
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
	keys: state.keys
});

export default connect(
	mapStateToProps,
	{ getItems, deleteItem, getDBKeys }
)(TaxPage);
