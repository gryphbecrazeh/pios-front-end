// ----------------------------React-------------------------------------------
import React, { Component } from "react";
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
// ----------------------------Components-------------------------------------------
// ----------------------------Redux-------------------------------------------
import { connect } from "react-redux";
import { addPayment, clearActions } from "../actions/paymentActions";

class AddNewPaymentModal extends Component {
	state = {};
	toggle = () => {
		this.setState({ modal: !this.state.modal });
	};
	render() {
		let { order } = this.props;
		return (
			<div>
				<Button block color="success" onClick={this.toggle}>
					Make A Payment
				</Button>
				<Modal isOpen={this.state.modal} toggle={this.toggle}>
					<ModalHeader toggle={this.toggle}>
						Making Payment for Order {order.orderNum}
					</ModalHeader>
					<ModalBody>Make a payment</ModalBody>
				</Modal>
			</div>
		);
	}
}
const mapStateToProps = state => ({
	payments: state.payments,
	auth: state.auth,
	keys: state.keys
});

export default connect(
	mapStateToProps,
	{
		addPayment,
		clearActions
	}
)(AddNewPaymentModal);
