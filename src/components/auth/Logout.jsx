import React, { Component, Fragment } from "react";
import { logout } from "../../actions/authActions";
import { connect } from "react-redux";
import { NavLink, Button } from "reactstrap";
import Proptypes from "prop-types";

class Logout extends Component {
	state = {};
	static propTypes = {
		logout: Proptypes.func.isRequired
	};
	render() {
		return (
			<Fragment>
				<Button color="primary" onClick={this.props.logout} href="#">
					Logout
				</Button>
			</Fragment>
		);
	}
}

export default connect(
	null,
	{ logout }
)(Logout);
