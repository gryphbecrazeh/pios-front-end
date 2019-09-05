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
		modal: false
	};
	toggle = () => {
		this.setState({ modal: !this.state.modal });
	};
	onChange = e => {
		let { dbKeys } = this.props;
		if (e.target.name === "payment_target") {
			let key = dbKeys.find(item => item.value === e.target.value);
			this.setState({
				target: key,
				targetPayKey: key.relatedKeys.find(
					payKey => payKey === `${e.target.value}Paid`
				),
				targetPayKeyDate: key.relatedKeys.find(
					payKey => payKey === `${e.target.value}PaidDate`
				)
			});
		}
		this.setState(
			{
				[e.target.name]: e.target.value
			},
			() => console.log(this.state)
		);
	};
	render() {
		let { order, dbKeys } = this.props;
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
									// value={due - paid || 0.0}
								></Input>
							</Col>

							<Col>
								<Label>Remaining Balance</Label>
								<Input
									type="number"
									name="remaining_balance"
									disabled
									// value={due - paid || 0.0}
								></Input>
							</Col>
						</Row>
						<Row>
							<Col>
								<Label>Payment Amount</Label>
								<Input
									type="number"
									name="state.payment_target"
									placeholder="Enter Actual Payment Amount here"
									onChange={this.onChange}
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
											name="payment_date"
											type="Date"
											placeholder="Please Enter Payment Date"
											onChange={this.onChange}
										></Input>
									</Col>
									<Col>
										<Label>Payment With</Label>
										<Input
											name="payment_type"
											type="select"
											multiple
											onChange={this.onChangeMultiSelect}
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
											name="payment_amount"
											type="select"
											onChange={this.onChange}
										>
											<option>Partial</option>
											<option>Full</option>
											<option>Deposit</option>
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
