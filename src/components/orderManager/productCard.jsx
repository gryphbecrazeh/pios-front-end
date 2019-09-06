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
	ButtonGroup,
	InputGroup,
	InputGroupAddon,
	InputGroupText
} from "reactstrap";
class ProductCard extends Component {
	state = {};
	updateProduct = () => {
		console.log("update");
	};
	onChange = e => {
		let { skus_quantity } = this.props.product;
		let { name, value } = e.target;
		if (name === "quantity" && value > skus_quantity)
			e.target.value = skus_quantity;
		if (name === "quantity" && value < 0) e.target.value = 0;

		this.setState({
			[name]: value
		});
	};
	render() {
		let {
			_id,
			order_number,
			brand,
			sku,
			skus_quantity,
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
				<CardHeader>{`${brand} ${sku} (Qty. ${skus_quantity})`}</CardHeader>
				<CardBody>
					<Container fluid>
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
													this.state.quantity == skus_quantity
														? this.toggle
														: this.updateProduct
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
export default ProductCard;
