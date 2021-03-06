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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/pro-regular-svg-icons";
// ----------------------------Components-------------------------------------------
// ----------------------------Redux-------------------------------------------
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
	getPayments,
	clearPayments,
	addPayment,
	deletePayment,
	clearActions
} from "../actions/paymentActions";
import { editItem } from "../actions/itemActions";
class PaymentModal extends Component {
	state = {
		...this.props.payments,
		modal: false,
		makePayment: false,
		dropdown: false
	};
	componentDidUpdate(prevProps) {
		const { error } = this.props;
		let { payments } = this.props.payments;
		if (error !== prevProps.error) {
			// Check for register error
			if (payments.msg === "Save Successful") {
				this.setState({ msg: payments.msg });
			} else {
				this.setState({
					msg: null
				});
			}
		}
		// If authenticated close modal
		if (this.state.modal && payments.success === true) {
			this.toggle();
		}
	}
	toggle = () => {
		this.setState(
			{
				modal: !this.state.modal
			},
			() => {
				if (this.state.modal) {
					let { order, auth } = this.props;
					this.props.getPayments(this.props.order.orderNum);
					this.setState({
						customer_order: order._id,
						order_number: order.orderNum,
						user: auth.user.name
					});
				} else {
					this.props.clearActions();
					this.props.clearPayments();
				}
			}
		);
	};
	deletePayment = e => {
		e.preventDefault();
		let { payments } = this.props.payments;
		let updatedOrder = { ...this.props.order };
		let payment = payments.find(item => item._id === e.target.name);
		let { payment_type, total_paid } = payment;
		updatedOrder[payment_type] = updatedOrder[payment_type] + total_paid;
		updatedOrder[`${payment_type}Paid`] =
			updatedOrder[`${payment_type}Paid`] - total_paid;
		updatedOrder[`${payment_type}PaidDate`] = "";
		this.props.editItem(updatedOrder);
		this.props.deletePayment(e.target.name);
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
					payment_date: this.state.makePayment ? Date() : ""
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
			<Card className="mb-2">
				<CardBody>
					<CardTitle>
						<Container>
							<Row>
								<Col className="text-nowrap">Status: Pending</Col>
								<Col>{payment.payment_type}</Col>
								<Col>Paid: ${payment.total_paid}</Col>
								<Col className="text-nowrap">
									Payment Date: {new Date(payment.payment_date).toDateString()}
								</Col>
							</Row>
						</Container>
					</CardTitle>
					<CardText>
						{localStorage.token &&
						this.props.auth.user &&
						this.props.auth.user.permissions.find(item => item === "Delete") ? (
							<Button
								onClick={this.deletePayment}
								color="danger"
								name={payment._id}
								block
							>
								Cancel Payment
							</Button>
						) : null}
					</CardText>
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
				this.state.remaining_balance <= 0 ? this.state.payment_date : "",
			[this.state.payment_type]: this.state.total_remaining
		};
		this.setState(
			{
				makePayment: false,
				dropdown: false,
				payment_label: "",
				payment_type: "",
				remaining_balance: "",
				total_remaining: ""
			},
			() => {
				this.props.editItem(updatedItem);
			}
		);
	};
	render() {
		const PreviousPayments = (
			<Fragment>
				{!this.props.payments.payments ? null : (
					<div
						className="previous-payments-container mb-2"
						style={{ maxHeight: "15rem", overflow: "auto" }}
					>
						{this.props.payments.payments.map(payment =>
							this.RenderPayment(payment)
						)}
					</div>
				)}
			</Fragment>
		);
		const MakePayment = (
			<Fragment>
				<Row>
					<Col>
						{localStorage.token &&
						this.props.auth.user &&
						this.props.auth.user.permissions.find(item => item === "Edit") ? (
							<Button block onClick={this.togglePayment}>
								Make new payment
							</Button>
						) : null}
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
							<Row className="mb-2">
								<Col>
									<Dropdown
										isOpen={this.state.dropdown}
										toggle={this.toggleDropDown}
										className="mb-2"
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
										className="mb-1"
									/>
									<Input
										onChange={this.onChangeNote}
										type="textarea"
										placeholder="Optional Notes"
										className="mb-1"
									/>
									<Button type="submit" color="primary" block className="mb-1">
										Save Payment
									</Button>
								</Col>
							</Row>
						</Container>
					</FormGroup>
				</Form>
			</Fragment>
		);

		return (
			<div>
				{localStorage.token &&
				this.props.auth.user &&
				this.props.auth.user.roles.find(item => item === "Financial") ? (
					<Button
						className="mb-1"
						block={this.props.noBlock ? false : true}
						color="success"
						onClick={this.toggle}
					>
						<FontAwesomeIcon icon={faDollarSign} />
					</Button>
				) : null}

				<Modal isOpen={this.state.modal} toggle={this.toggle} size="xl">
					<ModalHeader toggle={this.toggle}>
						Order Number: {this.props.order.orderNum}
					</ModalHeader>
					<ModalBody>
						<Container>
							{this.props.payments.payments &&
							this.props.payments.payments.length > 0
								? PreviousPayments
								: "No Previous Payments"}
							{this.state.makePayment ? NewPayment : MakePayment}
						</Container>
						<ModalFooter>
							<Container>
								<Row>
									<Col>User: {this.state.user}</Col>
									<Col className="text-nowrap">Date: {Date()}</Col>
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
	getPayments: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	payments: state.payments,
	auth: state.auth,
	keys: state.keys
});

export default connect(
	mapStateToProps,
	{
		getPayments,
		clearPayments,
		editItem,
		addPayment,
		deletePayment,
		clearActions
	}
)(PaymentModal);
