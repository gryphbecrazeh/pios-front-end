import React, { Component, Fragment } from "react";
import LoginModal from "../components/auth/LoginModal";
import RegisterModal from "../components/auth/RegisterModal";
import Logout from "../components/auth/Logout";
import { Container, Col, Row } from "reactstrap";

// ----------------------------Redux-------------------------------------------
import { connect } from "react-redux";
import { getItems, deleteItem, getDBKeys } from "../actions/itemActions";
import { getFilters, addFilter } from "../actions/filterActions";
import PropTypes from "prop-types";
import { login } from "../actions/authActions";
class WelcomePage extends Component {
	state = {};
	componentDidMount() {
		this.props.getFilters();
	}
	render() {
		const { isAuthenticated, user } = this.props.auth;

		const authLinks = (
			<Fragment>
				{!isAuthenticated ? null : (
					<h4>
						{/* Give time range and add welcome back option */}
						Welcome {new Date(user.register_date) < Date.now() ? "" : ""}
						{`${user.name}`}
					</h4>
				)}
			</Fragment>
		);
		const guestLinks = (
			<Fragment>
				<LoginModal />
			</Fragment>
		);
		return (
			<div>
				<Container>
					<Row
						style={{
							flexDirection: "column",
							alignContent: "center",
							justifyContent: "center"
						}}
					>
						<Col size="12">
							{localStorage.token ? authLinks : <LoginModal />}
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}
WelcomePage.propTypes = {
	getItems: PropTypes.func.isRequired,
	item: PropTypes.object.isRequired,
	getFilters: PropTypes.func.isRequired,
	filters: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	item: state.item,
	keys: state.keys,
	filters: state.filters
});
export default connect(
	mapStateToProps,
	{ getItems, deleteItem, getDBKeys, getFilters, addFilter }
)(WelcomePage);
