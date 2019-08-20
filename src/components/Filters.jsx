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
import { getFilters, addFilter } from "../actions/filterActions";
import PropTypes from "prop-types";
import { relative } from "path";

class Filters extends Component {
	constructor(props) {
		super(props);
		this.state = this.props.filters;
		this.state.dropdownOpen = false;
	}
	componentDidMount() {
		this.props.getFilters();
	}
	onToggleDropdown = () => {
		this.setState({ dropdownOpen: !this.state.dropdownOpen });
	};
	onChangeDate = (target, e) => {
		let date = String(e);
		if (target === "start") {
			this.setState({ sortStart: e }, () => {
				this.props.addFilter(this.state);
			});
		} else {
			this.setState({ sortEnd: e }, () => {
				this.props.addFilter(this.state);
			});
		}
	};
	onChangeSearch = e => {
		this.setState({
			searchQuery: e.target.value ? e.target.value : null
		});
		this.props.addFilter(this.state);
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
			<div className="filter-container">
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
										selected={this.state.sortStart}
										onChange={this.onChangeDate.bind(this, "start")}
									/>

									<Datepicker
										selected={this.state.sortEnd}
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
	{ getFilters, addFilter }
)(Filters);
