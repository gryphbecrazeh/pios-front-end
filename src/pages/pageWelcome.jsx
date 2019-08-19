import React, { Component, Fragment } from "react";
import LoginModal from "../components/auth/LoginModal";
import RegisterModal from "../components/auth/RegisterModal";
import Logout from "../components/auth/Logout";
import { connect } from "react-redux";
import {Container,Col,Row} from  "reactstrap"
class WelcomePage extends Component {
	state = {};
	render() {
		const { isAuthenticated } = this.props.auth;

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
				<Container>
					<Row style={{flexDirection:"column",alignContent:"center",justifyContent:"center"}}>
						<Col size="12">
						<h1>Welcome</h1>
</Col>
						<Col size="12">
						{isAuthenticated ? authLinks : guestLinks}
</Col>
					</Row>
				</Container>
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
