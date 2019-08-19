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
import OrderSheet from "./OrderSheet";
// ----------------------------Redux-------------------------------------------
import { connect } from "react-redux";
import PropTypes from "prop-types";

class PaymentModal extends Component {
	state = {
		modal: false
	};
	toggle = () => {
		this.setState({
			modal: !this.state.modal
		});
    };
    previousPayments=(order)=>{
        let payments =this.props.getPayments(order)
        return (
            <Fragment>
                {payments.map(payment=>{
                    
                })}
            </Fragment>
        )
        })
    }
	render() {
		const { order } = this.props;
		return (
			<div>
				<Button color="success" onClick={this.toggle} />

				<Modal isOpen={this.state.modal} toggle={this.toggle} size="xl">
					<ModalHeader toggle={this.toggle}>
						<Container>
							<Row>
								<Col>Add Payment to Order {` ${this.props.order.orderNum}`} </Col>
							</Row>
						</Container>
					</ModalHeader>
					<ModalBody>

					</ModalBody>
					<ModalFooter>
						<Container>
							<Row>
								<Col>Last Updated :{order.lastUpdated}</Col>
							</Row>
						</Container>
					</ModalFooter>
				</Modal>
			</div>
		);
	}
}

PaymentModal.propTypes = {
	item: PropTypes.object.isRequired,
	users: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	item: state.item,
    users: state.users,
    payments:state.payments
});

export default connect(
	mapStateToProps,
	null
)(PaymentModal);
