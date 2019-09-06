// ----------------------------React-------------------------------------------
import React, { getState } from "react";
// ----------------------------NPM-------------------------------------------
import {
	Row,
	Col,
	Container,
	Card,
	CardBody,
	CardHeader,
	CardFooter,
	Button
} from "reactstrap";

function ReadyOrder({ order, products }) {
	console.log(products);
	return (
		<Card>
			<CardHeader>{`Order ${order.orderNum}`}</CardHeader>
			<CardBody>
				<Container>
					{products.map(product => (
						<Row>
							<Col>{`Qty: ${product.skus_quantity} ${product.sku}`}</Col>
						</Row>
					))}
				</Container>
			</CardBody>
			<CardFooter>
				<Button block>Ship this Order</Button>
			</CardFooter>
		</Card>
	);
}
export default ReadyOrder;
