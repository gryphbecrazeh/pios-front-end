import React, { Component } from "react";
import { Input } from "reactstrap";
import { connect } from "react-redux";
import Proptypes from "prop-types";
import { addFilter } from "../actions/filterActions";
import { getItems } from "../actions/itemActions";

class MobileSearchBar extends Component {
	state = {};
	onChangeSearchItem = e => {
		let target = e.target;
		this.props.addFilter({
			productSearchQuery:
				target.value && target.value.length > 0 ? target.value : ""
		});
	};

	render() {
		return (
			<div className="d-xs-block d-md-none">
				<Input
					onChange={this.onChangeSearchItem}
					name="search"
					placeholder="Search for a product by sku or brand"
				/>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth,
	filters: state.filters
});
export default connect(
	mapStateToProps,
	{ addFilter, getItems }
)(MobileSearchBar);
