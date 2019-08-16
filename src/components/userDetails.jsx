import React, { Component } from "react";
import {
	Button,
	Modal,
	ModalBody,
	ModalHeader,
	ModalFooter,
	Alert,
	Form,
	FormGroup,
	Label,
	Input
} from "reactstrap";
// ----------------------------Components-------------------------------------------
import EditModal from "./editModal";
// ----------------------------Redux-------------------------------------------
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
	getUsers,
	addUser,
	deleteUser,
	editUser
} from "../actions/userActions";

class UserDetails extends Component {
	state = {
		modal: false,
		_id: "",
		name: "",
		email: "",
		password: ""
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
				<td>
					<Button color="warning" onClick={this.onEditClick}>
						Edit
					</Button>
					<Modal isOpen={this.state.modal} toggle={this.onEditClick}>
						<ModalHeader toggle={this.onEditClick}>{`Edit user ${
							this.state.name
						}`}</ModalHeader>
						<ModalBody>
							{this.state.msg ? (
								<Alert color="danger">{this.state.msg}</Alert>
							) : null}
							<Form onSubmit={this.onSubmit}>
								<FormGroup>
									<Label for="name">Name</Label>
									<Input
										type="text"
										name="name"
										id="name"
										placeholder="Name"
										className="mb-3"
										onChange={this.onChange}
										value={this.state.name}
									/>
									<Label for="name">Email</Label>
									<Input
										type="text"
										name="email"
										id="email"
										placeholder="email"
										className="mb-3"
										onChange={this.onChange}
										value={this.state.email}
									/>
									<Label for="name">Password</Label>
									<Input
										type="password"
										name="password"
										id="password"
										placeholder="Password"
										className="mb-3"
										onChange={this.onChange}
									/>
									<Button color="primary" style={{ marginTop: "2rem" }} block>
										Update
									</Button>
								</FormGroup>
							</Form>
							<ModalFooter>{`User ID: ${this.state._id}`}</ModalFooter>
						</ModalBody>
					</Modal>

					<Button
						color="danger"
						onClick={this.onDeleteClick.bind(this, user._id)}
					>
						Del
					</Button>
				</td>
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
	users: state.users
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
