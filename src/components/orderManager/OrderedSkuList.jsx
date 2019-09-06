import React, { useState } from "react";
import ProductCard from "./productCard";
import {
	Row,
	Col,
	Container,
	Card,
	CardBody,
	CardHeader,
	CardFooter
} from "reactstrap";

function OrderedSkuList({ products, filters }) {
	return (
		<Card className="ordered-sku-container">
			<CardHeader>Skus to be checked</CardHeader>
			{products
				// Add items to this screen when the order has been sent to the vendor, only things pending reception will show here
				.filter(item => {
					let { productSearchQuery } = filters;
					return (
						item.brand.match(new RegExp(productSearchQuery, "gmi")) ||
						item.sku.match(new RegExp(productSearchQuery, "gmi"))
					);
				})
				.map(item => (
					<Row className="mb-2 ml-auto mr-auto mt-2">
						<Col>
							<ProductCard product={item} />
						</Col>
					</Row>
				))}
		</Card>
	);
}

export default OrderedSkuList;
