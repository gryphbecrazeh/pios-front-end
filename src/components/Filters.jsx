import React, { Component } from "react";
import { Label, Button, Container, Row, Col } from "reactstrap";
// ----------------------------Components-------------------------------------------
import Datepicker from "react-datepicker";
import "react-datepicker/src/stylesheets/datepicker.scss";
// ----------------------------Redux-------------------------------------------
import { connect } from "react-redux";
import { getFilters, addFilter } from "../actions/filterActions";
import { getItems } from "../actions/itemActions";
import PropTypes from "prop-types";

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
		if (target === "start") {
			this.setState({ sortStart: e }, () => {
				this.props.addFilter(this.state);
				this.props.getItems(this.props.filters);
			});
		} else {
			this.setState({ sortEnd: e }, () => {
				this.props.addFilter(this.state);
				this.props.getItems(this.props.filters);
			});
		}
	};

	showAll = () => {
		this.setState(
			{
				showAll: !this.state.showAll
			},
			() => {
				this.props.addFilter(this.state);
				this.props.getItems(this.props.filters);
			}
		);
	};

	render() {
		return (
			<div className="filter-container">
				<Container className="mb-5">
					<Row>
						<Col md="6">
							<Label>Sort By Date range</Label>
						</Col>
					</Row>
					<Row className="mb-3">
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
					<Row>
						<Col>
							<Button onClick={this.showAll}>
								{!this.state.showAll
									? "Show All Orders"
									: "Show Orders by Range"}
							</Button>
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}

Filters.propTypes = {
	getFilters: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	filters: state.filters
});

export default connect(
	mapStateToProps,
	{ getFilters, addFilter, getItems }
)(Filters);
