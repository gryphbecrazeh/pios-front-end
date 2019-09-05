import React, { Component } from "react";
// ----------------------------Components-------------------------------------------
import EditUserModal from "./auth/EditUserModal";
// ----------------------------Redux-------------------------------------------
import { connect } from "react-redux";
import {
	getUsers,
	addUser,
	deleteUser,
	editUser
} from "../actions/userActions";

class UserDetails extends Component {
	state = {
		modal: false,
		changePassword: true
	};
	componentDidMount() {
		let { user } = this.props;
		this.setState({
			_id: user._id,
			name: user.name,
			email: user.email
		});
	}
	onDeleteClick = _id => {
		this.props.deleteUser(_id);
	};
	onEditClick = () => {
		this.setState({
			modal: !this.state.modal
		});
	};
	onChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};
	onSubmit = e => {
		e.preventDefault();
		const { _id, name, email, password } = this.state;
		// Create USER object
		const user = {
			_id,
			name,
			email,
			password
		};
		this.props.editUser(user);
	};
	render() {
		let { user } = this.props;
		return (
			<tr>
				{localStorage.token &&
				this.props.auth.user &&
				this.props.auth.user.permissions.find(item => item === "Edit") ? (
					<td>
						<EditUserModal user={user} />
					</td>
				) : null}

				<td name="User Date" type="date" code="user-date">{`${new Date(
					user.register_date
				).toDateString() || ""}`}</td>
				<td name="User Email" type="integer" code="user-email">{`${user.email ||
					""}`}</td>
				<td
					name="Customer Name"
					type="string"
					code="customer-name"
				>{`${user.name || "N/A"}`}</td>
			</tr>
		);
	}
}

UserDetails.propTypes = {};

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
)(UserDetails);
