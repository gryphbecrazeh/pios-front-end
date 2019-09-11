// ----------------------------React-------------------------------------------
import React, { Component, Fragment } from "react";
// ----------------------------NPM-------------------------------------------
import {
	Row,
	Col,
	Container,
	Card,
	Button,
	CardBody,
	CardHeader,
	CardFooter,
	Input,
	Alert,
	ButtonGroup,
	InputGroup,
	InputGroupAddon,
	InputGroupText
} from "reactstrap";
// ----------------------------Redux-------------------------------------------
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
	getOrderedSkus,
	clearOrderedSkus,
	editOrderedSku
} from "../../actions/orderedSkuActions";
import { clearErrors } from "../../actions/errorActions";
import { clearActions, editItem, getItems } from "../../actions/itemActions";
import { getAlerts } from "../../actions/alertActions";
class ProductCard extends Component {
	state = {};
	inStock = () => {
		// Extract keys from props
		let {
			product,
			getOrderedSkus,
			editOrderedSku,
			customerOrders,
			orderedSkus,
			editItem,
			getItems,
			getAlerts
		} = this.props;
		// Extract keys from product
		let {
			_id,
			customer_order,
			skus_quantity,
			stock_array,
			shipmentStatus,
			skus_remaining_quantity
		} = product;
		// extract keys from state
		let { quantity } = this.state;
		// Determin remaining quantity based on whether one already exists or not
		let remainingQuantity = skus_remaining_quantity
			? skus_remaining_quantity - quantity
			: skus_quantity - quantity;
		// Create new stock event to be stored in mongo db to better track stock changes for this order
		let newStockEvent = {
			date: new Date(Date.now()).toDateString(),
			quantity: quantity,
			status: "in stock"
		};
		// initiallize an updated version of the product with the remaining skus quantity, new stockevent, and potentially changing the shipping status
		let updatedProduct = {
			...product,
			skus_remaining_quantity: remainingQuantity,
			stock_array: [...stock_array, newStockEvent],
			shipmentStatus: remainingQuantity > 0 ? shipmentStatus : "Ready"
		};
		// Update the order status if all orderedSkus are ready to be shipped
		// Filter customerOrders to find the order that we will be updating
		let targetOrder = customerOrders.find(
			order => order._id === customer_order
		);
		// Return false if there are no remaining shipments
		let remainingShipments =
			orderedSkus
				.filter(order => order.customer_order === customer_order)
				.find(
					order => order.shipmentStatus === "Ready" && order._id !== _id
				) === undefined;
		if (!remainingShipments) {
			let updatedOrder = {
				...targetOrder,
				orderStatus: [...targetOrder.orderStatus, "Ready to ship to Customer"]
			};
			editItem(updatedOrder, () => {
				getItems();
				getAlerts();
			});
		}
		editOrderedSku(updatedProduct, () => getOrderedSkus());
	};
	onChange = e => {
		let { skus_quantity, skus_remaining_quantity } = this.props.product;
		let { name, value } = e.target;
		let oldQuantity = skus_remaining_quantity
			? skus_remaining_quantity
			: skus_quantity;
		if (name === "quantity" && value > oldQuantity)
			e.target.value = oldQuantity;
		if (name === "quantity" && value < 0) e.target.value = 0;

		this.setState({
			[name]: value
		});
	};
	alert = () => {
		this.setState({ alert: "Please fill out quantity to continue..." });
	};
	render() {
		let {
			_id,
			order_number,
			brand,
			sku,
			skus_quantity,
			skus_remaining_quantity,
			order_placed,
			user,
			options,
			note,
			vendor,
			cost,
			totalCost,
			costDaroma
		} = this.props.product;
		return (
			<Card key={_id} style={{ maxWidth: "40rem" }}>
				<CardHeader>{`${brand} ${sku} (Qty. ${skus_remaining_quantity ||
					skus_quantity})`}</CardHeader>
				<CardBody>
					<Container fluid>
						{!this.state.alert ? null : (
							<Alert color="danger">{this.state.alert}</Alert>
						)}
						<Row>
							<Col>{`Order from ${vendor}`}</Col>
							<Col>{`Cost $${totalCost || cost || costDaroma}`}</Col>
						</Row>
						<Row>
							<Col>Options: </Col>
							<Col>{options ? options : "No options were requested"}</Col>
						</Row>
						<Row>
							<Col>Note: </Col>
							<Col>{note ? note : "No note was left"}</Col>
						</Row>
						<Row className="mb-2">
							<Col xs="12">
								<InputGroup>
									<InputGroupAddon addonType="prepend">
										<InputGroupText>Qty.</InputGroupText>
									</InputGroupAddon>
									<Input
										onChange={this.onChange}
										name="quantity"
										type="number"
									/>
									<InputGroupAddon addonType="append">
										<ButtonGroup>
											<Button
												onClick={
													this.state.quantity ? this.inStock : this.alert
												}
												color="success"
											>
												Currently In Stock
											</Button>
											<Button color="info">Send to Vendor</Button>
										</ButtonGroup>
									</InputGroupAddon>
								</InputGroup>
							</Col>
						</Row>
						<Row>
							<Col>
								<Button block disabled>
									Request Stock Status from Warehouse
								</Button>
							</Col>
						</Row>
					</Container>
				</CardBody>
				<CardFooter>{`Order Placed ${new Date(
					order_placed
				).toDateString()} for order ${order_number} by ${user}`}</CardFooter>
			</Card>
		);
	}
}
const mapStateToProps = state => ({
	customerOrders: state.item.customerOrders,
	orderedSkus: state.orderedSkus.orderedSkus
});

export default connect(
	mapStateToProps,
	{
		getOrderedSkus,
		clearOrderedSkus,
		clearErrors,
		clearActions,
		editOrderedSku,
		editItem,
		getItems,
		getAlerts
	}
)(ProductCard);
