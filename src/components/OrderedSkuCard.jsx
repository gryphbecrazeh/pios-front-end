import React, { Component } from "react";
import { Button, Container, Row, Col, ButtonGroup, Alert } from "reactstrap";
// ----------------------------Components-------------------------------------------
// ----------------------------Redux-------------------------------------------
import { connect } from "react-redux";
import { deleteOrderedSku } from "../actions/orderedSkuActions";
class OrderedSkuCard extends Component {
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
	removeItem = () => {
		this.props.deleteOrderedSku(this.props.sku._id);
	};
	render() {
		let { sku } = this.props;
		return (
			<div key={this.props.skuKey}>
				<Alert color={this.ShipmentStatusColor()}>
					<Container>
						<Row>
							<Col className="text-nowrap" xs="9">
								{`Status: ${sku.shipmentStatus} Ordered: ${sku.skus_quantity} Sku: ${sku.sku} From: ${sku.vendor}`}
							</Col>
							<Col>
								<ButtonGroup>
									<Button onClick={this.removeItem}>Remove</Button>
								</ButtonGroup>
							</Col>
						</Row>
						<Row>
							Date Added: {new Date(sku.creation_date).toDateString()} by{" "}
							{sku.user}
						</Row>
					</Container>
				</Alert>
			</div>
		);
	}
}

const mapStateToProps = state => ({});

export default connect(
	mapStateToProps,
	{ deleteOrderedSku }
)(OrderedSkuCard);
