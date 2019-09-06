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
//----------------------------Components-------------------------------------------
import CreateShipmentModal from "./CreateShipmentModal";

function ReadyOrder({ order, products }) {
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
				<CreateShipmentModal
					order={order}
					products={products.filter(
						product => !product.shipmentStatus === "Shipped"
					)}
				/>
			</CardFooter>
		</Card>
	);
}
export default ReadyOrder;
