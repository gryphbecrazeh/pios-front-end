import React, { Component, Fragment } from "react";
import LoginModal from "../components/auth/LoginModal";
import RegisterModal from "../components/auth/RegisterModal";
import Logout from "../components/auth/Logout";
import { connect } from "react-redux";
import Proptypes from "prop-types";
import Logo from "../resources/logo.gif";
class WelcomePage extends Component {
	state = {};
	render() {
		const { isAuthenticated, user } = this.props.auth;

		const authLinks = (
			<Fragment>
				<Logout />
			</Fragment>
		);
		const guestLinks = (
			<Fragment>
				<RegisterModal />
				<LoginModal />
			</Fragment>
		);
		return (
			<div>
				<h1>Welcome</h1>
				{isAuthenticated ? authLinks : guestLinks}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth
});
export default connect(
	mapStateToProps,
	null
)(WelcomePage);
