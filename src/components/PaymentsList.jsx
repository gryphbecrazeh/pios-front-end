// ----------------------------React-------------------------------------------
import React, { Component, Fragment } from "react";
// ----------------------------Reactstrap-------------------------------------------
import { Container, Row, Col, Card, CardBody, CardTitle } from "reactstrap";
// ----------------------------Components-------------------------------------------
import AddNewPaymentModal from "./AddNewPaymentModal";
// ----------------------------Redux-------------------------------------------
import { connect } from "react-redux";
import PropTypes from "prop-types";

class PaymentsList extends Component {
	state = {};
	RenderPayment = payment => {
		return (
			<Card className="mb-2">
				<CardBody>
					<CardTitle>
						<Container>
							<Row>
								<Col className="text-nowrap">Status: Pending</Col>
								<Col>{payment.payment_type}</Col>
								<Col>Paid: ${payment.total_paid}</Col>
								<Col className="text-nowrap">
									Payment Date: {new Date(payment.payment_date).toDateString()}
								</Col>
							</Row>
						</Container>
					</CardTitle>
				</CardBody>
			</Card>
		);
	};
	render() {
		const PreviousPayments = (
			<Fragment>
				{!this.props.payments.length > 0 ? null : (
					<div
						className="previous-payments-container mb-2"
						style={{ maxHeight: "15rem", overflow: "auto" }}
					>
						{this.props.payments.map(payment => this.RenderPayment(payment))}
					</div>
				)}
			</Fragment>
		);
		return (
			<div>
				<Container style={{ maxHeight: "30rem", overflow: "auto" }}>
					<Row>
						<Col className="mt-2">
							{this.props.payments.length > 0
								? PreviousPayments
								: "No Previous Payments"}
						</Col>
					</Row>
					<Row>
						<Col>
							<AddNewPaymentModal order={this.props.order} />
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}

PaymentsList.propTypes = {
	payments: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
	payments: state.payments.payments
});

export default connect(
	mapStateToProps,
	null
)(PaymentsList);
