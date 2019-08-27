// ----------------------------React-------------------------------------------
import React, { Component, Fragment } from "react";
import classnames from "classnames";
// ----------------------------Reactstrap-------------------------------------------
import {
	Container,
	Row,
	Col,
	Card,
	CardBody,
	CardTitle,
	CardSubtitle,
	CardHeader,
	CardText,
	Label
} from "reactstrap";
// ----------------------------Components-------------------------------------------
import OrderedSkuCard from "./OrderedSkuCard";
// ----------------------------Redux-------------------------------------------

class OrderSheetView extends Component {
	state = {};
	render() {
		console.log(this.props);
		const {
			addrCheck,
			billToAddress,
			billToState,
			billToZip,
			caTax,
			caTaxPaid,
			creation_date,
			custDue,
			custPaid,
			custPaidDate,
			date,
			disclaim,
			lastUpdated,
			name,
			net,
			netCrate,
			netDue,
			netFreight,
			netPaid,
			netPaidDate,
			netTotal,
			nysTax,
			nysTaxPaid,
			orderNum,
			orderSkus,
			orderStatus,
			rcvd,
			sentTo,
			ship,
			shipToAddress,
			shipToZip,
			shipped,
			st,
			total,
			skus,
			_id
		} = this.props.order;
		let OrderTotal = (
			<Fragment>
				<Col>{`Order Total: $${total}`}</Col>
			</Fragment>
		);
		let OrderPaid = (
			<Fragment>
				<Col>
					{custPaidDate
						? `Order was paid in full on ${custPaidDate}`
						: "Order has not yet been paid in full"}
				</Col>
			</Fragment>
		);
		let CustomerPaid = (
			<Fragment>
				<Col>{`Customer has paid $${custPaid} of the $${custDue} due`}</Col>
			</Fragment>
		);
		let BillToCard = (
			<Fragment>
				<Col>
					<Card>
						<CardHeader>Bill To</CardHeader>
						<CardBody>
							<CardText>
								<Container>
									<Row>
										<Col>{billToAddress}</Col>
									</Row>
									<Row>
										<Col>{`${billToState}, ${billToZip}`}</Col>
									</Row>
								</Container>
							</CardText>
						</CardBody>
					</Card>
				</Col>
			</Fragment>
		);
		let ShipToCard = (
			<Fragment>
				<Col>
					<Card body inverse color={addrCheck ? "success" : "danger"}>
						<CardHeader>Ship To</CardHeader>
						<CardBody>
							<CardText>
								<Container>
									<Row>
										<Col>{shipToAddress}</Col>
									</Row>
									<Row>
										<Col>{`${st}, ${shipToZip}`}</Col>
									</Row>
								</Container>
							</CardText>
						</CardBody>
					</Card>
				</Col>
			</Fragment>
		);
		let Disclaimer = (
			<Fragment>
				<Col>Disclaimer: {disclaim}</Col>
			</Fragment>
		);
		let AddSkus = (
			<Fragment>
				<Row>
					<Col>
						<Label>
							<strong>Order Information</strong>
						</Label>
					</Col>
				</Row>

				<Row>
					<Col>
						<Row>
							<Col>
								<Label for="order">Skus</Label>
							</Col>
						</Row>
						{!this.props.order
							? null
							: this.props.order.orderSkus.map((sku, index) => (
									<OrderedSkuCard
										skuKey={index}
										sku={sku}
										order={this.props.order}
									/>
							  ))}
					</Col>
				</Row>
			</Fragment>
		);
		return (
			<div>
				<Container>
					<Row>
						<Col>
							<strong>Customer Order Information</strong>
						</Col>
					</Row>
					<Row>
						<Col>Order Date: {new Date(date).toDateString()}</Col>
						{total ? OrderTotal : null}
						{OrderPaid}
						{!custPaidDate ? CustomerPaid : null}
					</Row>
					<Row>
						<Col>Customer Name/Business Name: {name}</Col>
					</Row>
					<Row>
						{billToAddress && billToState && billToZip ? BillToCard : null}
						{shipToAddress && st && shipToZip ? ShipToCard : null}
					</Row>
					<Row>{disclaim ? Disclaimer : null}</Row>
					{orderSkus && orderSkus.length > 0 ? AddSkus : null}
				</Container>
			</div>
		);
	}
}

export default OrderSheetView;
