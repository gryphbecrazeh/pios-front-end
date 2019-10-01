// ----------------------------React-------------------------------------------
import React, { Component } from "react";
// ----------------------------Reactstrap-------------------------------------------
import {
	Button,
	Row,
	Col,
	Alert,
	Container,
	ModalBody,
	Input,
	Modal,
	ModalFooter,
	Label,
	ModalHeader,
	Card,
	CardBody
} from "reactstrap";
// ----------------------------Fontawesome-------------------------------------------
// ----------------------------Components-------------------------------------------
// ----------------------------Redux-------------------------------------------
import { connect } from "react-redux";
import { addShipment } from "../../actions/shipmentActions";
import PropTypes from "prop-types";

class FinalizeShipmentModal extends Component {
	state = { modal: false };
	toggle = () => {
		this.setState({ modal: !this.state.modal });
	};
	onChange = e => this.setState({ [e.target.name]: e.target.value });

	onShip = () => {
		let { shipment, order, addShipment } = this.props;
		let newShipment = {
			order_number: order.orderNum,
			customer_order: order._id,
			shipped_skus: [...shipment.selected],
			recipient_name: order.name,
			recipient_address: order.shipToAddress,
			recipient_state: order.st,
			recipient_zip: order.shipToZip,
			...shipment,
			...this.state
		};
		let updatedProducts = [...newShipment.selected];
		updatedProducts.forEach(product => {
			let updatedProduct = { ...product };
			if (updatedProduct.skus_remaining_quantity === 0)
				updatedProduct.shipmentStatus = "Shipped";
			console.log(updatedProduct);
		});
		// addShipment(newShipment, () => {
		// 	this.toggle();
		// 	this.props.toggleParent();
		// });
	};
	render() {
		let { order, shipment, toggleParent } = this.props;
		return (
			<div>
				<Button color="primary" block onClick={this.toggle}>
					Finalize this order
				</Button>
				<Modal isOpen={this.state.modal} toggle={this.toggle} size="lg">
					<ModalHeader
						toggle={this.toggle}
					>{`Finalizing Shipment for Order ${order.orderNum} `}</ModalHeader>
					<ModalBody style={{ maxHeight: "30em", overflow: "auto" }}>
						<Container>
							{order.custPaid === order.custDue ? null : (
								<div id="shipment-alert-container">
									<Row>
										<Col>
											<Alert color="danger">
												Order has not been paid in full by customer
											</Alert>
										</Col>
									</Row>
								</div>
							)}
							<Row className="mb-2">
								<Col>
									<Label>Ship To</Label>

									<Card>
										<CardBody>
											<Row className="mb-2">
												<Col>
													<Label>Attention</Label>
													<Input
														name="recipient_attention"
														onChange={this.onChange}
														valid={this.state.recipient_attention}
														placeholder="Attention"
													></Input>
												</Col>
											</Row>

											<Row className="mb-2">
												<Col>
													<Label>Recipient Name</Label>
													<Input disabled value={order.name}></Input>
												</Col>
											</Row>
											<Row className="mb-2">
												<Col>
													<Label>Recipient Address</Label>
													<Input disabled value={order.shipToAddress}></Input>
												</Col>
											</Row>
											<Row className="mb-2">
												<Col>
													<Input disabled value={order.st}></Input>
												</Col>
												<Col>
													<Input disabled value={order.shipToZip}></Input>
												</Col>
											</Row>
										</CardBody>
									</Card>
								</Col>
							</Row>
							<Row>
								<Col>
									<Label>Collect on Delivery (COD)</Label>
									<Input
										name="cod_amount"
										onChange={this.onChange}
										valid={this.state.cod_amount}
										placeholder="Enter COD amount if applicable"
									></Input>
								</Col>
								<Col>
									<Label>Lift Gate</Label>
									<Input
										name="lift_gate"
										onChange={this.onChange}
										valid={this.state.lift_gate}
										placeholder="Enter lift gate charge if applicable"
									></Input>
								</Col>
							</Row>
						</Container>
					</ModalBody>
					<ModalFooter className="text-center">
						<Container>
							<Row>
								<Col>
									<Label>Notes</Label>
									<Input
										type="textarea"
										name="notes"
										onChange={this.onChange}
										placeholder="Please record ANY additional information you can
						provide here..."
									></Input>
								</Col>
							</Row>
							<Row>
								<Col>
									Please verify the information above for accuracy, make any
									required changes
								</Col>
							</Row>
							<Row className="mt-2 mb-2">
								<Col>
									<Button
										color="success"
										type="button"
										block
										onClick={this.onShip}
									>
										Ship This Order
									</Button>
								</Col>
							</Row>
						</Container>
					</ModalFooter>
				</Modal>
			</div>
		);
	}
}
const mapStateToProps = state => ({
	auth: state.auth,
	shipments: state.shipments
});

export default connect(
	mapStateToProps,
	{ addShipment }
)(FinalizeShipmentModal);
