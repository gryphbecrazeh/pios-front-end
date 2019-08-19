// ----------------------------React-------------------------------------------
import React, { Component, Fragment } from "react";
// ----------------------------Reactstrap-------------------------------------------
import {
	Modal,
	ModalBody,
	ModalHeader,
	ModalFooter,
	Button,
	Container,
	Row,
	Col
} from "reactstrap";
// ----------------------------Components-------------------------------------------
import NewPaymentModal from "./newPaymentModal"
// ----------------------------Redux-------------------------------------------
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {getPayments} from "../actions/paymentActions"
class PaymentModal extends Component {
	constructor(props){
		super(props)
		this.state={
			order_id:this.props.order._id,
			order_number:this.props.order.orderNum,
			payment_date:Date.now(),
			user:this.props.auth.user
		}
	}
	toggle = () => {
		this.setState({
			payments:this.state.modal===false?this.props.getPayments(this.props.order._id):[],
			modal: !this.state.modal,
		});
	};
	renderPayments=()=>{
		return (<div>
			No previous Payments
		</div>)
	}
	render() {
		const { order,payments } = this.props;
		const OrderPayments=(
			<Fragment>
					{payments.payments.map(payment=>{
						return (
							<Row>
								<Col>
								{payment.payment_date}
								</Col>
							</Row>
						)
					})}
			</Fragment>
		)
		const NoPayments=(
			<Fragment>
				<Row>
					<Col>
					No previous payments available
					</Col>
				</Row>
			</Fragment>
		)
		return (
			<div>
				<Button color="success" onClick={this.toggle} >$</Button>

				<Modal isOpen={this.state.modal} toggle={this.toggle} size="xl">
					<ModalHeader toggle={this.toggle}>
						<Container>
							<Row>
								<Col>Payments for Order {` ${this.props.order.orderNum}`} </Col>
							</Row>
						</Container>
					</ModalHeader>
					<ModalBody>
					{this.state.payments&&this.state.payments.length>0?OrderPayments:NoPayments}
					<NewPaymentModal order={this.props.order}/>
					</ModalBody>
				</Modal>
			</div>
		);
	}
}

PaymentModal.propTypes = {
	item: PropTypes.object.isRequired,
	users: PropTypes.object.isRequired,
	getPayments:PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	item: state.item,
    users: state.users,
	payments:state.payments,
	auth:state.auth
});

export default connect(
	mapStateToProps,
	{getPayments}
)(PaymentModal);