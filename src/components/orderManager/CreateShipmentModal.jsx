// ----------------------------React-------------------------------------------
import React, { useState } from "react";
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

function CreateShipmentModal({ isOpen, toggle, quantity, product }) {
	if (isOpen) console.log(arguments);

	return (
		<Modal isOpen={isOpen} toggle={toggle} size="xl">
			<ModalHeader toggle={toggle}>{`Creating Shipment of ${quantity} ${
				product.sku
			}${quantity > 1 ? "'s" : ""} for Order # ${
				product.order_number
			}`}</ModalHeader>
			<ModalBody>Test</ModalBody>
			<ModalFooter>Test</ModalFooter>
		</Modal>
	);
}
export default CreateShipmentModal;
