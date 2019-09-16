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
import FinalizeShipmentModal from "./FinalizeShipmentModal";
// ----------------------------Redux-------------------------------------------
import { connect } from "react-redux";
import PropTypes from "prop-types";

class CreateShipmentModal extends Component {
	state = { modal: false, numSelectedProducts: 0, selected: [] };
	toggle = () => {
		this.setState({ modal: !this.state.modal });
	};
	grabSelectedItems = () => {
		let selection = Array.from(
			document.querySelectorAll("input[type=checkbox]:checked") || []
		);
		let selected = this.props.products.filter(item =>
			selection.find(select => item._id === select.name)
		);
		let reducer = (acc, cur) => acc + cur;
		this.setState({
			selected: selected || [],
			numSelectedProducts: selected.length,
			estimatedWeight:
				selected.length > 0
					? selected
							.map(item => item.shippingWeight || item.weight + 20 || 0)
							.reduce(reducer)
					: null
		});
	};
	onChange = e =>
		this.setState({ [e.target.name]: e.target.value }, () => {
			let required = [
				"tracking_number",
				"carrier",
				"estimatedWeight",
				"shipping_eta",
				"cost_crate",
				"cost_freight"
			];
			// required.forEach(item=>this.setState({[item]}))
		});
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
										onChange={this.onChange}
										invalid={!this.state.tracking_number}
										valid={this.state.tracking_number}
									></Input>
								</Col>
								<Col>
									<Label>Carrier</Label>
									<Input
										type="select"
										name="carrier"
										onChange={this.onChange}
										invalid={!this.state.carrier}
										valid={this.state.carrier}
									>
										<option>Select a Shipping Carrier</option>
										<option>FedEx Ground</option>
										<option>FedEx Freight</option>
										<option>UPS Ground</option>
										<option>UPS Freight</option>
										<option>KAS</option>
										<option>Kitchenall Local</option>
										<option>Common Carrier</option>
									</Input>
								</Col>
							</Row>
							<Row>
								<Col>
									<Label>Estimated Weight</Label>
									<InputGroup>
										<Input
											name="weight_ship"
											placeholder={
												this.state.estimatedWeight
													? `${this.state.estimatedWeight} estimated...`
													: "Please make a selection"
											}
											// placeholder="sum([allProducts]psw*q) sum all product shipping weight times quantity as placeholder only, fill in actual weight used in creating shipment"
											onChange={this.onChange}
											invalid={!this.state.weight_ship}
											valid={this.state.weight_ship}
										></Input>
										<InputGroupAddon addonType="append">lbs.</InputGroupAddon>
									</InputGroup>
								</Col>
								<Col>
									<Label>Estimated Arrival Date</Label>
									<Input
										type="date"
										name="shipping_eta"
										onChange={this.onChange}
										invalid={!this.state.shipping_eta}
										valid={this.state.shipping_eta}
									></Input>
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
											onChange={this.onChange}
											invalid={!this.state.cost_crate}
											valid={this.state.cost_crate}
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
											onChange={this.onChange}
											invalid={!this.state.cost_freight}
											valid={this.state.cost_freight}
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
										<FinalizeShipmentModal
											shipment={this.state}
											order={this.props.order}
											toggleParent={this.toggle}
										/>
									</Col>
								</Row>
							)}
						</Container>
					</ModalBody>
					<ModalFooter>{`${new Date(Date.now()).toDateString()} User: ${
						this.props.auth.user.name
					}`}</ModalFooter>
				</Modal>
			</div>
		);
	}
}
const mapStateToProps = state => ({
	auth: state.auth,
	claims: state.claims
});

export default connect(
	mapStateToProps,
	null
)(CreateShipmentModal);
