import React, { Component } from "react";

import {
	Card,
	CardBody,
	CardHeader,
	CardFooter,
	Container,
	Input,
	Label,
	Row,
	Col
} from "reactstrap";
class SelectSku extends Component {
	state = {
		isOpen: true
	};
	render() {
		let { product } = this.props;
		return (
			<Card className="mt-1 mb-1">
				<CardHeader>
					<Row>
						<Col xs="2">
							<input
								type="checkbox"
								name="select"
								className="form-control form-control-md"
							></input>
						</Col>
						<Col> {`${product.brand} ${product.sku}`}</Col>
						<Col>{` Qty.${product.skus_quantity} `}</Col>
					</Row>
				</CardHeader>
				<CardBody style={{ display: this.state.isOpen ? "block" : "none" }}>
					<Container>
						<Row>
							<Col>
								<Label>Options:</Label>
								<Input
									type={product.options ? "textarea" : "text"}
									disabled
									value={product.options || "No Options Selected for This Item"}
								></Input>
							</Col>
						</Row>
						<Row>
							<Col>
								<Label>Notes:</Label>
								<Input
									type={product.notes ? "textarea" : "text"}
									disabled
									value={product.notes || "No Notes Were Added for This Item"}
								></Input>
							</Col>
						</Row>
					</Container>
				</CardBody>
			</Card>
		);
	}
}
export default SelectSku;
