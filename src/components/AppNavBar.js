import React, { Component, Fragment } from "react";
import Logo from "../resources/logo.gif";
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink
} from "reactstrap";
import Logout from "./auth/Logout";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Proptypes from "prop-types";
import Filters from "./Filters";

class AppNavBar extends Component {
	state = { isOpen: false };
	toggle = () => {
		this.setState({
			isOpen: !this.state.isOpen
		});
	};
	static propTypes = {
		auth: Proptypes.object.isRequired
	};
	render() {
		const { isAuthenticated, user } = this.props.auth;

		const authLinks = (
			<Fragment>
				<NavItem>
					<Link to="/master-page">
						<NavLink href="/">Master Page</NavLink>
					</Link>
				</NavItem>
				<NavItem>
					<Link to="/tax-page">
						<NavLink href="/">Tax Page</NavLink>
					</Link>
				</NavItem>
				<NavItem>
					<Link to="/shipping-page">
						<NavLink href="/">Shipping Page</NavLink>
					</Link>
				</NavItem>
				<NavItem>
					<Link to="/user-manager">
						<NavLink href="/">User Manager</NavLink>
					</Link>
				</NavItem>

				<NavItem>
					<Logout />
				</NavItem>
			</Fragment>
		);
		const guestLinks = (
			<Fragment>
				<NavItem>
					<NavLink href="/">
						You must be logged in to access this content
					</NavLink>
				</NavItem>
			</Fragment>
		);
		const welcomeName = (
			<Fragment>
				<span className="navbar-text mr-3">
					<strong>{user ? `Welcome ${user.name}` : null}</strong>
				</span>
			</Fragment>
		);

		return (
			<div style={{ position: "sticky" }}>
				<Navbar color="light" light expand="sm" className="mb-5">
					<NavbarBrand href="/">
						<img
							style={{ height: "2em", paddingRight: "2em" }}
							src={Logo}
							alt="Kitchenall Logo"
						/>
						{isAuthenticated ? welcomeName : null}
					</NavbarBrand>
					<NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={this.state.isOpen} navbar>
						<Nav className="ml-auto" navbar>
							{isAuthenticated ? authLinks : guestLinks}
						</Nav>
					</Collapse>
				</Navbar>
				<Filters />
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
)(AppNavBar);
