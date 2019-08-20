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
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// ----------------------------Redux-------------------------------------------
import { connect } from "react-redux";
import { getItems, deleteItem, getDBKeys } from "../actions/itemActions";
import { getFilters, addFilter } from "../actions/filterActions";
import PropTypes from "prop-types";

class Filters extends Component {
	state = {
		sort: true,
		sortTarget: "date",
		endDate: Date.now(),
		startDate: new Date("01/01/2016"),
		searchQuery: false,
		searchTarget: "name",
		searchTargetLabel: "Customer Name",
		dropdownOpen: false
	};
	componentDidMount() {
		this.props.addFilter({
			sortStart: new Date(this.state.startDate),
			sortEnd: new Date(this.state.endDate),
			searchQuery: this.state.searchQuery
		});
	}
	onToggleDropdown = () => {
		this.setState({ dropdownOpen: !this.state.dropdownOpen });
	};
	onChangeDate = (target, e) => {
		if (target === "start") {
			this.setState({ startDate: new Date(e) });
		} else {
			this.setState({ endDate: new Date(e) });
		}
		this.props.addFilter({
			sortStart: new Date(this.state.startDate),
			sortEnd: new Date(this.state.endDate),
			searchQuery: this.state.searchQuery
		});
	};
	onChangeSearch = e => {
		this.setState({
			searchQuery: e.target.value ? e.target.value : false
		});
		this.props.addFilter({
			sortStart: new Date(this.state.startDate),
			sortEnd: new Date(this.state.endDate),
			searchQuery: this.state.searchQuery
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
	render() {
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
					</FormGroup>
				</Form>
			</div>
		);
	}
}

Filters.propTypes = {
	getItems: PropTypes.func.isRequired,
	item: PropTypes.object.isRequired,
	getFilters: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	filters: state.filters
});

export default connect(
	mapStateToProps,
	{ getItems, deleteItem, getDBKeys, getFilters, addFilter }
)(Filters);
