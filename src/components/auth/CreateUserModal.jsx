import React, { Component } from "react";
import {
	Button,
	Modal,
	ModalBody,
	ModalHeader,
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
import { addUser } from "../../actions/userActions";

class CreateUserModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false,
			changePassword: false,
			roles: ["Guest"],
			permissions: [],
			name: "",
			email: "",
			password: ""
		};
	}
	onChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};
	toggle = () => {
		this.setState(
			{
				modal: !this.state.modal
			},
			() => {
				if (this.state.modal === false) {
					this.setState({
						modal: false,
						changePassword: false,
						roles: ["Guest"],
						permissions: [],
						name: "",
						email: "",
						password: ""
					});
				}
			}
		);
	};
	multiSelect = e => {
		let options = [...e.target.options].filter(
			option => option.selected === true
		);
		this.setState({
			[e.target.name]: options.map(item => item.value)
		});
	};
	onCreateUser = () => {
		let newUser = {
			...this.state
		};
		this.props.addUser(newUser);
	};
	render() {
		return (
			<div>
				{localStorage.token &&
				this.props.auth.user &&
				this.props.auth.user.permissions.find(item => item === "Create") ? (
					<Button className="mb-3" color="primary" onClick={this.toggle}>
						Register New User
					</Button>
				) : null}
				<Modal isOpen={this.state.modal} toggle={this.toggle}>
					<ModalHeader toggle={this.toggle}>Creating New User</ModalHeader>
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
									invalid={this.state.name ? false : true}
									valid={this.state.name ? true : false}
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
									invalid={this.state.email ? false : true}
									valid={this.state.email ? true : false}
								/>
								<Label for="name">Password</Label>
								<Input
									type="password"
									name="password"
									id="password"
									placeholder="Password"
									className="mb-3"
									onChange={this.onChange}
									value={this.state.password}
									invalid={this.state.password ? false : true}
									valid={this.state.password ? true : false}
								/>
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
								onClick={this.onCreateUser}
								color="primary"
								style={{ marginTop: "2rem" }}
								block
							>
								Create New User
							</Button>
						</Form>
					</ModalBody>
				</Modal>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	users: state.users,
	auth: state.auth
});

export default connect(
	mapStateToProps,
	{
		addUser
	}
)(CreateUserModal);
