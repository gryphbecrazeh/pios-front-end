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
	Col,
	Label,
	Input
} from "reactstrap";
// ----------------------------Components-------------------------------------------
// ----------------------------Redux-------------------------------------------
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addNote } from "../actions/noteActions";

class AddNoteModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false,
			user: this.props.auth.user.name,
			date: Date()
		};
	}
	toggle = () => {
		this.setState({
			modal: !this.state.modal
		});
	};
	selectOption = e => {
		this.setState({
			category: e.target.value
		});
	};
	changeBody = e => {
		this.setState({
			note: e.target.value
		});
	};
	changeSubject = e => {
		this.setState({
			subject: e.target.value
		});
	};
	saveNote = () => {
		let { order } = this.props;
		console.log(order, this.state);
		this.props.addNote({
			...this.state,
			customer_order: order._id,
			order_number: order.orderNum
		});
	};
	render() {
		return (
			<div>
				<Button className="mb-1" block color="warning" onClick={this.toggle}>
					Add Note
				</Button>
				<Modal isOpen={this.state.modal} toggle={this.toggle} size="xl">
					<ModalHeader toggle={this.toggle}>
						<Container>
							<Row>
								<Col>
									Creating Note for order: {` ${this.props.order.orderNum}`}{" "}
								</Col>
							</Row>
						</Container>
					</ModalHeader>
					<ModalBody>
						<Container>
							<Row>
								<Col>User: {this.state.user}</Col>
								<Col>Date: {this.state.date}</Col>
							</Row>
							<Row>
								<Col>
									<Label>Subject</Label>
									<Input
										type="text"
										placeholder="Subject"
										onChange={this.changeSubject}
									/>
								</Col>
								<Col>
									<Label>Note Type</Label>
									<Input type="select" onChange={this.selectOption}>
										<option>Order Details</option>
										<option>Customer Payment</option>
										<option>Customer Shipping</option>
										<option>Kitchenall Payment</option>
										<option>Kitchenall Shipment</option>
										<option>Vendor Shipment</option>
										<option>Vendor Payment</option>
										<option>MISC</option>
									</Input>
								</Col>
							</Row>
							<Row>
								<Col>
									<Label>Body</Label>
									<Input
										type="textarea"
										placeholder="Body"
										onChange={this.changeBody}
									></Input>
								</Col>
							</Row>
						</Container>
					</ModalBody>
					<ModalFooter>
						<Button block color="success" onClick={this.saveNote}>
							Save Note
						</Button>
					</ModalFooter>
				</Modal>
			</div>
		);
	}
}

AddNoteModal.propTypes = {
	users: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(
	mapStateToProps,
	{ addNote }
)(AddNoteModal);
