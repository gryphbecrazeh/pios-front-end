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
	Input,
	Col,
	Row
} from "reactstrap";
// ----------------------------Components-------------------------------------------
// ----------------------------Redux-------------------------------------------
import { connect } from "react-redux";
import {
	getUsers,
	addUser,
	deleteUser,
	editUser
} from "../../actions/userActions";

class EditUserModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false,
			changePassword: false,
			...props.user
		};
	}
	checkRole = e => {
		console.log(e.target.value);
	};
	onChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};
	toggle = () => {
		this.setState({
			modal: !this.state.modal
		});
	};
	onSubmit = () => {
		alert("submit");
	};
	onDeleteUser = () => {
		this.props.deleteUser(this.props.user._id);
		this.toggle();
	};
	resetPassword = () => {
		this.props.editUser({
			...this.props.user,
			password: "password"
		});
		alert("Their password is now 'password'");
	};
	multiSelect = e => {
		let options = [...e.target.options].filter(
			option => option.selected === true
		);
		this.setState(
			{
				[e.target.name]: options.map(item => item.value)
			},
			() => console.log(this.state)
		);
	};
	onUpdateUser = () => {
		let updatedUser = {
			...this.props.user,
			...this.state
		};
		delete updatedUser.password;
		this.props.editUser(updatedUser);
	};
	render() {
		let { user } = this.props;
		return (
			<div>
				<Button block color="warning" onClick={this.toggle}>
					Edit
				</Button>
				<Modal isOpen={this.state.modal} toggle={this.toggle}>
					<ModalHeader
						toggle={this.toggle}
					>{`Edit user ${user.name}`}</ModalHeader>
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
								<Row>
									<Col>
										<Button
											block
											color="warning"
											type="button"
											onClick={this.resetPassword}
										>
											Reset Password
										</Button>
									</Col>
								</Row>
							</FormGroup>
							<FormGroup>
								<Row>
									<Col>
										<Label>Roles</Label>
										<Input
											onChange={this.multiSelect}
											name="roles"
											type="select"
											multiple
										>
											<option
												selected={this.state.roles.find(
													role => role === "Guest"
												)}
											>
												Guest
											</option>
											<option
												selected={this.state.roles.find(
													role => role === "Office"
												)}
											>
												Office
											</option>
											<option
												selected={this.state.roles.find(
													role => role === "Financial"
												)}
											>
												Financial
											</option>
											<option
												selected={this.state.roles.find(
													role => role === "Shipping"
												)}
											>
												Shipping
											</option>
											<option
												selected={this.state.roles.find(
													role => role === "Warehouse"
												)}
											>
												Warehouse
											</option>
											<option
												selected={this.state.roles.find(
													role => role === "Asset Protection"
												)}
											>
												Asset Protection
											</option>
											<option
												selected={this.state.roles.find(
													role => role === "Admin"
												)}
											>
												Admin
											</option>
											<option
												selected={this.state.roles.find(
													role => role === "Website"
												)}
											>
												Website
											</option>
										</Input>
									</Col>
									<Col>
										<Label>Permissions</Label>
										<Input
											onChange={this.multiSelect}
											name="permissions"
											type="select"
											multiple
										>
											<option
												selected={this.state.permissions.find(
													role => role === "Create"
												)}
											>
												Create
											</option>
											<option
												selected={this.state.permissions.find(
													role => role === "View"
												)}
											>
												View
											</option>
											<option
												selected={this.state.permissions.find(
													role => role === "Edit"
												)}
											>
												Edit
											</option>
											<option
												selected={this.state.permissions.find(
													role => role === "Delete"
												)}
											>
												Delete
											</option>
										</Input>
									</Col>
								</Row>
							</FormGroup>
							<Button
								onClick={this.onUpdateUser}
								color="primary"
								style={{ marginTop: "2rem" }}
								block
							>
								Update
							</Button>
							<Button
								color="danger"
								style={{ marginTop: "2rem" }}
								block
								onClick={this.onDeleteUser}
							>
								Delete
							</Button>
						</Form>
						<ModalFooter>{`User ID: ${user._id}`}</ModalFooter>
					</ModalBody>
				</Modal>
			</div>
		);
	}
}

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
)(EditUserModal);
