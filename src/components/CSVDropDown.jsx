import React, { Component } from "react";
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownToggle
} from "reactstrap";
import { connect } from "react-redux";
import { getKeys, saveDBKeys, getDBKeys } from "../actions/itemActions";
import PropTypes from "prop-types";

class CSVDropDown extends Component {
	state = {
		isOpen: false,
		selected: "",
		label: "Select a header"
	};
	componentDidMount() {
		this.props.getDBKeys();
	}
	toggle = () => {
		this.setState({
			isOpen: !this.state.isOpen
		});
	};
	handleChange = val => {
		this.setState({
			label: val
		});
	};

	handleClick = e => {
		let newKeys = this.props.keys.dbKeys;
		this.setState({
			selected: e.target.value
		});
		newKeys[this.props.index] = e.target.value;
		this.props.saveDBKeys(newKeys);
		this.handleChange(e.target.name);
	};
	render() {
		return (
			<Dropdown isOpen={this.state.isOpen} toggle={this.toggle}>
				<DropdownToggle>{this.state.label}</DropdownToggle>
				<DropdownMenu>
					{this.props.keys.dbKeysList.map(item => {
						return (
							<DropdownItem
								onClick={this.handleClick}
								value={item.value}
								name={item.label}
							>
								{item.label}
							</DropdownItem>
						);
					})}
				</DropdownMenu>
			</Dropdown>
		);
	}
}

CSVDropDown.propTypes = {
	getKeys: PropTypes.func.isRequired,
	keys: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	keys: state.keys
});

export default connect(
	mapStateToProps,
	{ getKeys, saveDBKeys, getDBKeys }
)(CSVDropDown);
