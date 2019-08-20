import React, { Component } from "react";
import { Label, Button, Container, Row, Col } from "reactstrap";
// ----------------------------Components-------------------------------------------
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// ----------------------------Redux-------------------------------------------
import { connect } from "react-redux";
import { getFilters, addFilter } from "../actions/filterActions";
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

	showAll = () => {
		this.setState(
			{
				showAll: !this.state.showAll
			},
			() => {
				this.props.addFilter(this.state);
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
									: "Show Filtered Orders"}
							</Button>
						</Col>
					</Row>
				</Container>
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
