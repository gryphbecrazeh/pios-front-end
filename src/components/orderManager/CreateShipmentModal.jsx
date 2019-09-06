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

class CreateShipmentModal extends Component {
	state = { modal: false };
	toggle = () => {
		this.setState({ modal: !this.state.modal });
	};
	render() {
		let { order, products } = this.props;
		return (
			<div>
				<Button block color="primary" onClick={this.toggle}>
					Ship This Order
				</Button>
				<Modal isOpen={this.state.modal} toggle={this.toggle} size="xl">
					<ModalHeader
						toggle={this.toggle}
					>{`Creating Shipment for Order ${order.orderNum}`}</ModalHeader>
					<ModalBody>
						<Container>
							<Row>
								<Col></Col>
							</Row>
						</Container>
					</ModalBody>
					<ModalFooter>Test</ModalFooter>
				</Modal>
			</div>
		);
	}
}
export default CreateShipmentModal;
