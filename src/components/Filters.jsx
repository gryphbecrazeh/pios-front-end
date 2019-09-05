import React, { Component } from "react";
import { Label, Button, Container, Row, Col } from "reactstrap";
// ----------------------------Components-------------------------------------------
import Datepicker from "react-datepicker";
import "react-datepicker/src/stylesheets/datepicker.scss";
import BulkActionsModal from "../components/bulkActionModal";

// ----------------------------Redux-------------------------------------------
import { connect } from "react-redux";
import { getFilters, addFilter } from "../actions/filterActions";
import { getItems } from "../actions/itemActions";
import { getAlerts } from "../actions/alertActions";
import PropTypes from "prop-types";

class Filters extends Component {
	constructor(props) {
		super(props);
		this.props.getItems(this.props.filters, this.props.getAlerts);
		this.state = this.props.filters;
		this.state.dropdownOpen = false;
	}
	onToggleDropdown = () => {
		this.setState({ dropdownOpen: !this.state.dropdownOpen });
	};
	onChangeDate = (target, e) => {
		if (target === "start") {
			this.setState({ sortStart: new Date(e) }, () => {
				this.props.addFilter(this.state);
				this.props.getItems(this.props.filters, item => getAlerts(item));
			});
		} else {
			this.setState({ sortEnd: new Date(e) }, () => {
				this.props.addFilter(this.state);
			});
		}
		setTimeout(
			() => this.props.getItems(this.props.filters, item => getAlerts(item)),
			50
		);
	};

	showAll = () => {
		this.setState(
			{
				showAll: !this.state.showAll
			},
			() => {
				this.props.addFilter(this.state);
				this.props.getItems(this.props.filters, item => getAlerts(item));
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
					<Row className="mt-2">
						<Col>
							<BulkActionsModal />
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
	{ getFilters, addFilter, getItems, getAlerts }
)(Filters);
