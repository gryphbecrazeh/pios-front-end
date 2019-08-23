import React, { Component, Fragment } from "react";
import Logo from "../resources/logo.gif";
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	Input,
	NavLink,
	Button,
	Row,
	Col,
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem
} from "reactstrap";
import Logout from "./auth/Logout";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Proptypes from "prop-types";
import { addFilter } from "../actions/filterActions";
class AppNavBar extends Component {
	state = {
		isOpen: false,
		dropDown: false,
		target: { page: "Home", href: "/" }
	};
	toggle = () => {
		this.setState({
			isOpen: !this.state.isOpen
		});
	};
	setPage = item => {
		console.log(item);
		this.setState({
			target: item
		});
	};
	toggleDropDown = () => {
		this.setState({
			dropDown: !this.state.dropDown
		});
	};
	static propTypes = {
		auth: Proptypes.object.isRequired
	};
	onChangeSearch = e => {
		let target = e.target;
		this.props.addFilter({
			showAll: target.value ? true : false,
			searchQuery: e.target.value || null
		});
		let value;
		!target.value
			? this.props.addFilter({ searchQuery: "" })
			: (value = "filled");
	};
	render() {
		const { isAuthenticated, user } = this.props.auth;

		const authLinks = (
			<Fragment>
				<NavItem>
					<Dropdown isOpen={this.state.dropDown} toggle={this.toggleDropDown}>
						<DropdownToggle className="text-nowrap" caret color="primary">
							{this.state.target.page}
						</DropdownToggle>
						<DropdownMenu>
							<DropdownItem header>Admin</DropdownItem>
							<DropdownItem
								onClick={this.setPage.bind(this, {
									page: "User Manager",
									href: "/user-manager"
								})}
							>
								<Link to="/user-manager">
									<NavLink href="/">User Manager</NavLink>
								</Link>
							</DropdownItem>
							<DropdownItem disabled>Admin Notifications</DropdownItem>

							<DropdownItem divider />
							<DropdownItem header>Office</DropdownItem>

							<DropdownItem
								onClick={this.setPage.bind(this, {
									page: "Master Page",
									href: "/master-page"
								})}
							>
								<Link to="/master-page">
									<NavLink href="/">Master Page</NavLink>
								</Link>
							</DropdownItem>
							<DropdownItem
								onClick={this.setPage.bind(this, {
									page: "Financial Page",
									href: "/tax-page"
								})}
							>
								<Link to="/tax-page">
									<NavLink href="/">Tax Page</NavLink>
								</Link>
							</DropdownItem>
							<DropdownItem disabled>Office Notifications</DropdownItem>
							<DropdownItem divider />
							<DropdownItem header>Warehouse</DropdownItem>
							<DropdownItem
								onClick={this.setPage.bind(this, {
									page: "Product Manager",
									href: "/product-manager"
								})}
							>
								<Link to="/product-manager">
									<NavLink href="/">Product Manager</NavLink>
								</Link>
							</DropdownItem>

							<DropdownItem disabled>Warehouse Notifications</DropdownItem>

							<DropdownItem divider />
							<DropdownItem header>Shipping</DropdownItem>
							<DropdownItem
								onClick={this.setPage.bind(this, {
									page: "Shipping Manager",
									href: "/shipping-page"
								})}
							>
								<Link to="/shipping-page">
									<NavLink href="/">Shipping Page</NavLink>
								</Link>
							</DropdownItem>
							<DropdownItem disabled>Shipping Notifications</DropdownItem>

							<DropdownItem divider />
							<DropdownItem header>User</DropdownItem>
							<DropdownItem disabled>Notifications</DropdownItem>
							<DropdownItem>
								<Logout />
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
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
				<span className="navbar-text">
					<strong>{user ? `Welcome ${user.name}` : null}</strong>
				</span>
			</Fragment>
		);
		const SearchOrder = (
			<Fragment>
				<Col className="d-none d-md-block" xl="6" md="6">
					<Input
						onChange={this.onChangeSearch}
						name="search"
						placeholder="Search for an order by name or order number"
					/>
				</Col>
			</Fragment>
		);
		return (
			<div style={{ position: "sticky", zIndex: "900", top: "0" }}>
				<Navbar color="light" light expand="sm" className="mb-5">
					<NavbarBrand href="/">
						<img
							style={{ height: "2em", paddingRight: "1em" }}
							src={Logo}
							alt="Kitchenall Logo"
						/>
						{isAuthenticated ? welcomeName : null}
					</NavbarBrand>
					{isAuthenticated ? SearchOrder : null}
					<NavbarToggler onClick={this.toggle} />
					<Col>
						<Collapse isOpen={this.state.isOpen} navbar>
							<Nav navbar>{isAuthenticated ? authLinks : guestLinks}</Nav>
						</Collapse>
					</Col>
				</Navbar>
				{/* <Filters /> */}
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
	{ addFilter }
)(AppNavBar);
