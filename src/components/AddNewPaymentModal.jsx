// ----------------------------React-------------------------------------------
import React, { Component, Fragment } from "react";
// ----------------------------Reactstrap-------------------------------------------
import {
	Modal,
	ModalBody,
	ModalHeader,
	ModalFooter,
	Button,
	Container,
	Row,
	Label,
	Card,
	CardBody,
	CardTitle,
	CardText,
	Col,
	Input,
	Dropdown,
	DropdownItem,
	DropdownToggle,
	DropdownMenu,
	Form,
	FormGroup
} from "reactstrap";
// ----------------------------Fontawesome-------------------------------------------
// ----------------------------Components-------------------------------------------
// ----------------------------Redux-------------------------------------------
import { connect } from "react-redux";
import { addPayment, clearActions } from "../actions/paymentActions";

class AddNewPaymentModal extends Component {
	state = {
		modal: false,
		payment_amount: 0.0,
		remaining_balance: 0,
		payment_date: new Date(Date.now()).toDateString()
	};
	toggle = () => {
		this.setState({ modal: !this.state.modal });
	};
	onChange = e => {
		let { order, dbKeys } = this.props;
		let {
			targetPayKey,
			targetPayKeyDate,
			payment_target,
			target,
			payment_amount,
			remaining_balance,
			total_due
		} = this.state;
		if (total_due < e.target.value) e.target.value = total_due;
		if (e.target.name === "payment")
			this.setState({
				[e.target.name]: e.target.value
			});
	};
	onChangeDateNew = e => {
		let date = new Date(e.target.value) || Date.now();
		date.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
		this.setState({
			date: new Date(date).toDateString()
		});
	};

	render() {
		let { order, dbKeys } = this.props;
		let {
			targetPayKey,
			targetPayKeyDate,
			payment_target,
			target,
			payment_amount,
			remaining_balance,
			total_due
		} = this.state;
		let Payment = (
			<Fragment>
				{!this.state.payment_target ? null : (
					<FormGroup>
						<Row>
							<Col>
								<Label>Total Due</Label>
								<Input
									type="number"
									name="total_due"
									disabled
									value={total_due}
								></Input>
							</Col>

							<Col>
								<Label>Remaining Balance</Label>
								<Input
									type="number"
									name="remaining_balance"
									disabled
									value={this.state.remaining_balance}
								></Input>
							</Col>
						</Row>
						<Row>
							<Col>
								<Label>Payment Amount</Label>
								<Input
									type="number"
									name="payment_amount"
									placeholder="Enter Actual Payment Amount here"
									onChange={this.onChange}
									valid={this.state.payment_amount}
									invalid={!this.state.payment_amount}
								></Input>
							</Col>
						</Row>
						<Row>
							<Col>
								<Label>Notes</Label>
								<Input
									type="textarea"
									placeholder="Enter Notes Here"
									name="notes"
									onChange={this.onChange}
								></Input>
							</Col>
						</Row>
					</FormGroup>
				)}
			</Fragment>
		);
		return (
			<div>
				<Button block color="success" onClick={this.toggle}>
					Make A Payment
				</Button>
				<Modal isOpen={this.state.modal} toggle={this.toggle} size="xl">
					<ModalHeader toggle={this.toggle}>
						Making Payment for Order {order.orderNum}
					</ModalHeader>
					<ModalBody>
						<Form className="mb-3">
							<Container>
								<Row>
									<Col>
										<Label>Payment Date</Label>
										<Input
											placeholder={this.state.payment_date}
											type="text"
											onfocus="(this.type='date')"
											onblur="(this.type='text')"
											onChange={this.onChangeDateNew}
											valid={this.state.payment_date != null}
											name="payment_date"
											value={this.state.payment_date}
										></Input>
									</Col>
									<Col>
										<Label>Payment With</Label>
										<Input
											name="payment_type"
											type="select"
											multiple
											onChange={this.onChangeMultiSelect}
											valid={this.state.payment_type}
											invalid={!this.state.payment_type}
										>
											<option>Cash</option>
											<option>Credit</option>
											<option>Check</option>
											<option>Debit</option>
											<option>Loan</option>
											<option>Financing</option>
											<option>Wire Transfer</option>
											<option>Online</option>
										</Input>
									</Col>
								</Row>
								<Row>
									<Col>
										<Label>Payment Towards</Label>
										<Input
											name="payment_target"
											type="select"
											onClick={this.onChange}
											valid={this.state.payment_target}
											invalid={!this.state.payment_target}
										>
											{dbKeys
												.filter(key => key.payable === true)
												.map((key, index) => (
													<option key={index} value={key.value}>
														{key.label}
													</option>
												))}
										</Input>
									</Col>

									<Col>
										<Label>Payment Amount Type</Label>
										<Input
											name="payment_amount_type"
											type="select"
											onClick={this.onChange}
											valid={this.state.payment_amount_type}
											invalid={!this.state.payment_amount_type}
										>
											<option
												selected={this.state.payment_amount_type === "Partial"}
											>
												Partial
											</option>
											<option
												selected={this.state.payment_amount_type === "Full"}
											>
												Full
											</option>
										</Input>
									</Col>
								</Row>
								{Payment}
							</Container>
						</Form>
					</ModalBody>
					<ModalFooter>
						<Container>
							<Row>
								<Col>Date: {new Date(Date.now()).toDateString()}</Col>
								<Col>User: {this.props.auth.user.name}</Col>
							</Row>
						</Container>
					</ModalFooter>
				</Modal>
			</div>
		);
	}
}
const mapStateToProps = state => ({
	payments: state.payments,
	auth: state.auth,
	keys: state.keys,
	dbKeys: state.keys.dbKeysList
});

export default connect(
	mapStateToProps,
	{
		addPayment,
		clearActions
	}
)(AddNewPaymentModal);
