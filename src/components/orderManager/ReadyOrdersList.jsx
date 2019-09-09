// ----------------------------React-------------------------------------------

import React, { useState } from "react";
// ----------------------------NPM-------------------------------------------
import {
	Row,
	Col,
	Container,
	Card,
	CardBody,
	CardHeader,
	CardFooter
} from "reactstrap";
// ----------------------------Components-------------------------------------------
import ReadyOrder from "./ReadyOrder";

function ReadyOrdersList({ orders, products }) {
	return (
		<Card className="mt-1 mb-1">
			<CardHeader>Orders Ready to Ship</CardHeader>
			<CardBody>
				{orders.map(order => {
					let orderProducts = products
						// .filter(product => product.order_number === order.orderNum)
						.filter(product => product.shipmentStatus === "Ready");
					return orderProducts.length > 0 ? (
						<ReadyOrder order={order} products={orderProducts} />
					) : null;
				})}
			</CardBody>
		</Card>
	);
}

export default ReadyOrdersList;
