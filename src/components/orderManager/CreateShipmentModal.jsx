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
	InputGroup,
	InputGroupAddon,
	Dropdown,
	DropdownItem,
	DropdownToggle,
	DropdownMenu,
	Form,
	FormGroup
} from "reactstrap";
// ----------------------------Fontawesome-------------------------------------------
// ----------------------------Components-------------------------------------------
import SelectSku from "./SelectSku";
// ----------------------------Redux-------------------------------------------

class CreateShipmentModal extends Component {
	state = { modal: false, numSelectedProducts: 0, selected: [] };
	toggle = () => {
		this.setState({ modal: !this.state.modal });
	};
	grabSelectedItems = () => {
		let selected = Array.from(
			document.querySelectorAll("input[type=checkbox]:checked") || null
		);
		this.setState({
			selected: selected || null,
			numSelectedProducts: selected.length
		});
	};
	render() {
		let { order, products, orderStats } = this.props;
		let { numReadyProducts, numShippedProducts, numTotalProducts } = orderStats;
		let { numSelectedProducts } = this.state;
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
								<Col>
									<Label>Tracking Number</Label>
									<Input
										name="tracking_number"
										placeholder="Enter Shipment tracking number"
									></Input>
								</Col>
								<Col>
									<Label>Carrier</Label>
									<Input type="select" name="carrier">
										<option>FedEx Ground</option>
										<option>FedEx Freight</option> <option>UPS Ground</option>
										<option>UPS Freight</option>
									</Input>
								</Col>
							</Row>
							<Row>
								<Col>
									<Label>Estimated Weight</Label>
									<Input
										name="weight_ship"
										placeholder="sum([allProducts]psw*q) sum all product shipping weight times quantity as placeholder only, fill in actual weight used in creating shipment"
									></Input>
								</Col>
								<Col>
									<Label>Estimated Arrival Date</Label>
									<Input type="date"></Input>
								</Col>
							</Row>
							<Row>
								<Col>
									<Label>Cost Crate</Label>
									<InputGroup>
										<InputGroupAddon addonType="prepend">$</InputGroupAddon>
										<Input
											type="number"
											name="cost_crate"
											placeholder="123.50"
										></Input>
									</InputGroup>
								</Col>
								<Col>
									<Label>Cost Freight</Label>
									<InputGroup>
										<InputGroupAddon addonType="prepend">$</InputGroupAddon>
										<Input
											type="number"
											name="cost_freight"
											placeholder="123.50"
										></Input>
									</InputGroup>
								</Col>
							</Row>
							<div className="mb-2 mt-2">
								<Row>
									<Col>{`${numSelectedProducts}/${numReadyProducts} of total products selected...`}</Col>
								</Row>

								{!numShippedProducts > 0 ? null : (
									<Row>
										<Col>{`${numShippedProducts}/${numTotalProducts} of total products shipped...`}</Col>
									</Row>
								)}
								{numReadyProducts === numTotalProducts ? null : (
									<Row>
										<Col>{`${numReadyProducts}/${numTotalProducts} of total products ready to be shipped...`}</Col>
									</Row>
								)}
							</div>
							<Row>
								<Col>
									<Label>Select the Skus to Be Shipped</Label>
								</Col>
							</Row>
							{products.map(product => (
								<Row>
									<Col>
										<SelectSku
											product={product}
											onChange={this.grabSelectedItems}
										/>
									</Col>
								</Row>
							))}
							{!this.state.selected.length > 0 ? null : (
								<Row>
									<Col>
										<Button block color="success">
											Ship this order
										</Button>
									</Col>
								</Row>
							)}
						</Container>
					</ModalBody>
					<ModalFooter>Test</ModalFooter>
				</Modal>
			</div>
		);
	}
}
export default CreateShipmentModal;
