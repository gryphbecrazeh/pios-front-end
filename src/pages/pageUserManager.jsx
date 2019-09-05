import React, { Component } from "react";
import { Table, Button } from "reactstrap";
import "react-datepicker/src/stylesheets/datepicker.scss";
// ----------------------------Components-------------------------------------------
import UserDetails from "../components/userDetails";
import CreateUserModal from "../components/auth/CreateUserModal";
// ----------------------------Redux-------------------------------------------
import { connect } from "react-redux";
import {
	getUsers,
	addUser,
	deleteUser,
	editUser
} from "../actions/userActions";
import PropTypes from "prop-types";

class UserManagerPage extends Component {
	state = {
		sort: true,
		sortTarget: "date",
		endDate: Date.now(),
		startDate: "",
		searchQuery: false,
		searchTarget: "name",
		searchTargetLabel: "Customer Name",
		dropdownOpen: false
	};
	componentDidMount() {
		let d = new Date();
		d.setDate(d.getDate() - 14);
		this.setState({ startDate: d });
		this.props.getUsers();
	}
	renderOrders = item => {
		return item;
	};
	sortByDate = item => {
		return item.sort((a, b) => {
			return this.state.sort === false
				? new Date(a.date) - new Date(b.date)
				: new Date(b.date) - new Date(a.date);
		});
	};
	sortByTarget = item => {
		return item.sort((a, b) => {
			return this.state.sort === false
				? a[this.state.sortTarget] - b[this.state.sortTarget]
				: b[this.state.sortTarget] - a[this.state.sortTarget];
		});
	};
	onChangeDate = (target, e) => {
		if (target === "start") {
			this.setState({ startDate: new Date(e) });
		} else {
			this.setState({ endDate: new Date(e) });
		}
	};
	filterByDateRange = (item, range1, range2) => {
		let arrangeDates = new Date(range2) > new Date(range1);
		let start = arrangeDates === true ? new Date(range1) : new Date(range2);
		let end = arrangeDates === true ? new Date(range2) : new Date(range1);
		return item.filter(
			item => new Date(item.date) >= start && new Date(item.date) <= end
		);
	};
	toggleSort = e => {
		this.setState({
			sort: !this.state.sort,
			sortTarget: e.target.name
		});
	};
	onChangeSearch = e => {
		this.setState({
			searchQuery: e.target.value ? e.target.value : false
		});
	};
	onChangeSeachCriteria = e => {
		let critera = this.props.keys.dbKeysList.filter(
			item => item.value === e.target.value
		)[0];
		this.setState({
			searchTarget: critera.value,
			searchTargetLabel: critera
		});
	};
	search = item => {
		return item.filter(order =>
			order[this.state.searchTarget].match(
				new RegExp(
					`${this.state.searchQuery === false ? ".+" : this.state.searchQuery}`,
					"gmi"
				)
			)
		);
	};
	onToggleDropdown = () => {
		this.setState({
			dropdownOpen: !this.state.dropdownOpen
		});
	};
	render() {
		const { users } = this.props.users;
		return (
			<div className="page-container">
				<CreateUserModal />
				<div className="table-container" style={{ overflow: "auto" }}>
					<Table id="master-customer-details">
						<thead>
							<tr className="text-center text-nowrap">
								{this.props.auth.user.permissions.find(
									item => item === "Edit"
								) ? (
									<th code="edit" className="">
										Edit
									</th>
								) : null}
								<th code="user-generation-date">User Created</th>
								<th code="user-email">Email</th>
								<th code="user-name">Name</th>
							</tr>
						</thead>
						<tbody id="table-result-container">
							{this.renderOrders(users).map(item => {
								return <UserDetails user={item} />;
							})}
						</tbody>
					</Table>
				</div>
			</div>
		);
	}
}

UserManagerPage.propTypes = {
	getUsers: PropTypes.func.isRequired,
	users: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	users: state.users,
	auth: state.auth
});

export default connect(
	mapStateToProps,
	{
		getUsers,
		addUser,
		deleteUser,
		editUser
	}
)(UserManagerPage);
