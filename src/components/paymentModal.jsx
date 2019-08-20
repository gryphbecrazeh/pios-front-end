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
	Card,
	CardBody,
	CardSubtitle,
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
// ----------------------------Components-------------------------------------------
import NewPaymentModal from "./newPaymentModal";
// ----------------------------Redux-------------------------------------------
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
	getPayments,
	clearPayments,
	addPayment
} from "../actions/paymentActions";
import { editItem } from "../actions/itemActions";
class PaymentModal extends Component {
	state = {
		...this.props.payments,
		modal: false,
		makePayment: false,
		dropdown: false
	};
	toggle = () => {
		this.setState(
			{
				modal: !this.state.modal
			},
			() => {
				this.state.modal
					? this.props.getPayments(this.props.order.orderNum)
					: this.props.clearPayments();
				if (this.state.modal) {
					let { order, auth } = this.props;
					this.setState(
						{
							customer_order: order._id,
							order_number: order.orderNum,
							user: auth.user.name
						},
						() => {
							console.log(this.state);
						}
					);
				} else {
					this.props.clearPayments();
				}
			}
		);
	};
	onChangeNote = e => {
		this.setState({ note: e.target.value });
	};
	onPaymentChange = e => {
		this.setState({
			total_paid: e.target.value,
			total_remaining: this.state.total_due - e.target.value,
			remaining_balance: this.state.total_due - e.target.value
		});
	};
	togglePayment = () => {
		this.setState(
			{
				makePayment: !this.state.makePayment
			},
			() => {
				this.setState({
					payment_date: this.state.makePayment ? Date() : null
				});
			}
		);
	};
	toggleDropDown = () => {
		this.setState({
			dropdown: !this.state.dropdown
		});
	};
	selectDropDownItem = e => {
		this.setState({
			payment_type: e.target.value,
			payment_label: e.target.name,
			total_due: this.props.order[e.target.value]
		});
	};
	RenderPayment = payment => {
		return (
			<Card>
				<CardBody>
					<CardTitle>{payment.payment_type}</CardTitle>
					<CardSubtitle>{payment.total_paid}</CardSubtitle>
					<CardText>{payment.user}</CardText>
				</CardBody>
			</Card>
		);
	};
	createNewPayment = e => {
		e.preventDefault();
		this.props.addPayment(this.state);
		let updatedItem = {
			_id: this.state.customer_order,
			orderNum: this.state.order_number,
			[`${this.state.payment_type}Paid`]:
				Number(this.props.order[`${this.state.payment_type}Paid`]) +
				Number(this.state.total_paid),
			[`${this.state.payment_type}PaidDate`]:
				this.state.remaining_balance <= 0 ? this.state.payment_date : null,
			[this.state.payment_type]: this.state.total_remaining
		};
		this.setState(
			{
				makePayment: false,
				dropdown: false,
				payment_label: null,
				payment_type: null,
				remaining_balance: null,
				total_remaining: null
			},
			() => {
				this.props.editItem(updatedItem);
				this.props.clearPayments();
				this.toggle();
			}
		);
	};
	render() {
		console.log("state", this.state);
		const PreviousPayments = (
			<Fragment>
				<div className="previous-payments-container">
					{this.state.payments.map(payment => this.RenderPayment(payment))}
				</div>
			</Fragment>
		);
		const MakePayment = (
			<Fragment>
				<Row>
					<Col>
						<Button block onClick={this.togglePayment}>
							Make new payment
						</Button>
					</Col>
				</Row>
			</Fragment>
		);
		const RemainingBalance = (
			<Fragment>
				<Col>
					Remaining Balance:
					<span>{` $${this.state.total_due}`}</span>
				</Col>
			</Fragment>
		);
		const FloatingBalance = (
			<Fragment>
				<Col>
					Balance to be left over:
					<span>{` $${this.state.total_remaining}`}</span>
				</Col>
			</Fragment>
		);
		const NewPayment = (
			<Fragment>
				<Form onSubmit={this.createNewPayment}>
					<FormGroup>
						<Container>
							<Row>
								<Col>
									<Dropdown
										isOpen={this.state.dropdown}
										toggle={this.toggleDropDown}
									>
										<DropdownToggle caret>
											{this.state.payment_label || "Select Payment Type"}
										</DropdownToggle>
										<DropdownMenu>
											<DropdownItem
												onClick={this.selectDropDownItem}
												name="NYS Tax"
												value="nysTax"
											>
												NYS Tax
											</DropdownItem>
											<DropdownItem
												onClick={this.selectDropDownItem}
												name="CA Tax"
												value="caTax"
											>
												CA Tax
											</DropdownItem>
										</DropdownMenu>
									</Dropdown>
								</Col>
								{this.state.total_due ? RemainingBalance : null}
								{this.state.total_remaining ? FloatingBalance : null}
							</Row>
							<Row>
								<Col>
									<Input
										onChange={this.onPaymentChange}
										type="number"
										placeholder="Payment Amount"
									/>
									<Input
										onChange={this.onChangeNote}
										type="textarea"
										placeholder="Optional Notes"
									/>
									<Button type="submit" color="primary" block>
										Save Payment
									</Button>
								</Col>
							</Row>
						</Container>
					</FormGroup>
				</Form>
			</Fragment>
		);
		console.log(this.state);
		return (
			<div>
				<Button color="success" onClick={this.toggle}>
					$
				</Button>

				<Modal isOpen={this.state.modal} toggle={this.toggle} size="xl">
					<ModalHeader toggle={this.toggle}>
						Order Number: {this.props.order.orderNum}
					</ModalHeader>
					<ModalBody>
						<Container>
							{this.state.payments.length > 0
								? PreviousPayments
								: "No Previous Payments"}
							{this.state.makePayment ? NewPayment : MakePayment}
						</Container>
						<ModalFooter>
							<Container>
								<Row>
									<Col>User: {this.state.user}</Col>
									<Col>Date:{Date()}</Col>
								</Row>
							</Container>
						</ModalFooter>
					</ModalBody>
				</Modal>
			</div>
		);
	}
}

PaymentModal.propTypes = {
	users: PropTypes.object.isRequired,
	getPayments: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	payments: state.payments,
	auth: state.auth,
	keys: state.keys
});

export default connect(
	mapStateToProps,
	{ getPayments, clearPayments, editItem, addPayment }
)(PaymentModal);
