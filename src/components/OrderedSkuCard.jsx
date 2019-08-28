import React, { Component } from "react";
import { Button, Container, Row, Col, ButtonGroup, Alert } from "reactstrap";
// ----------------------------Components-------------------------------------------
// ----------------------------Redux-------------------------------------------

class OrderedSkuCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sku: this.props.sku,
			order: this.props.order
		};
	}
	ShipmentStatusColor = () => {
		switch (this.props.sku.shipmentStatus) {
			case "Recieved":
				return "primary";
			case "Sent to Shipped":
				return "warning";
			case "ordered":
				return "info";
			case "shipped":
				return "success";
			default:
				return "warning";
		}
	};
	render() {
		let { sku } = this.props;
		return (
			<div key={this.props.skuKey}>
				<Alert color={this.ShipmentStatusColor()}>
					<Container>
						<Row>
							<Col className="text-nowrap" xs="9">
								{`Status: ${sku.shipmentStatus} Ordered: ${sku.quantity} ${sku.sku}'s to be ordered from ${sku.dealer}`}
							</Col>
							<Col>
								<ButtonGroup>
									<Button>Remove</Button>
									<Button>Edit</Button>
								</ButtonGroup>
							</Col>
						</Row>
						<Row>Date Added: {sku.dateAdded}</Row>
					</Container>
				</Alert>
			</div>
		);
	}
}

export default OrderedSkuCard;
