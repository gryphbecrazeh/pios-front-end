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
		<Card>
			<CardHeader>Orders Ready to Ship</CardHeader>
			<CardBody>
				{orders.map(order => (
					<ReadyOrder
						order={order}
						products={products.filter(
							product => product.order_number === order.orderNum
						)}
					/>
				))}
			</CardBody>
		</Card>
	);
}

export default ReadyOrdersList;
