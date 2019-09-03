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
	Input
} from "reactstrap";

class ProductCard extends Component {
	state = {};
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
			note
		} = this.props.product;
		return (
			<Card key={_id}>
				<CardHeader>{`${brand} ${sku} (Qty. ${skus_quantity})`}</CardHeader>
				<CardBody>
					<Container>
						<Row>
							<Col>Options: </Col>
							<Col>{options ? options : "No options were requested"}</Col>
						</Row>
						<Row>
							<Col>Note: </Col>
							<Col>{note ? note : "No note was left"}</Col>
						</Row>
						<Row>
							<Col xs="2">
								<Input type="number" placeholder="Quantity" />
							</Col>
							<Col>
								<Button block color="success">
									Received
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
