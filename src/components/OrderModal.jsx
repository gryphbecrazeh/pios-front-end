import React, { Component } from "react";
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Form,
	FormGroup,
	Label,
	Input,
	Container,
	Row,
	Alert,
	Col
} from "reactstrap";

import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// ----------------------------Components-------------------------------------------
import UploadOrders from "./uploadOrders";
import OrderSheet from "./OrderSheet";
// ----------------------------Redux-------------------------------------------
import { connect } from "react-redux";
import { addItem, getItems } from "../actions/itemActions";
import PropTypes from "prop-types";
class OrderModal extends Component {
	state = {
		modal: false
	};
	toggle = () => {
		this.setState({
			modal: !this.state.modal
		});
	};
	render() {
		return (
			<div className="md-12 offset-10">
				<Button
					light
					color="primary"
					style={{ marginBottom: "2rem" }}
					onClick={this.toggle}
					block
				>
					Add Customer Order(s)
				</Button>
				<Modal isOpen={this.state.modal} toggle={this.toggle} size="xl">
					<ModalHeader toggle={this.toggle}>Add Customer Order(s)</ModalHeader>
					<ModalBody>
						<Container>
							<Row>
								<Col>
									<UploadOrders />
								</Col>
							</Row>
							<Row>
								<Col>
									<div className="text-center">OR</div>
								</Col>
							</Row>
						</Container>
						<OrderSheet />
					</ModalBody>
					<ModalFooter>Required Fields Are Red Followed By '*'</ModalFooter>
				</Modal>
			</div>
		);
	}
}
OrderModal.propTypes = {
	addItem: PropTypes.func.isRequired,
	item: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	item: state.item
});

export default connect(
	mapStateToProps,
	{ addItem, getItems }
)(OrderModal);
