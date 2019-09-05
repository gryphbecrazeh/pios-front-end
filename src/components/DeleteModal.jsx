// ----------------------------React-------------------------------------------
import React, { Component } from "react";
// ----------------------------Reactstrap-------------------------------------------
import {
	Modal,
	ModalBody,
	ModalHeader,
	ModalFooter,
	Button,
	Container,
	Row,
	Col,
	Input
} from "reactstrap";
// ----------------------------Components-------------------------------------------
// ----------------------------Fontawesome-------------------------------------------
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/pro-light-svg-icons";
// ----------------------------Redux-------------------------------------------
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getNotes, deleteNote, clearNotes } from "../actions/noteActions";
import {
	getPayments,
	deletePayment,
	clearPayments
} from "../actions/paymentActions";
import { deleteItem, getItems } from "../actions/itemActions";
import {
	getOrderedSkus,
	deleteOrderedSku,
	clearOrderedSkus
} from "../actions/orderedSkuActions";
import { getAlerts } from "../actions/alertActions";
import { getClaims, deleteClaim, clearClaims } from "../actions/claimsAction";
class DeleteModal extends Component {
	state = {
		modal: false,
		activeTab: "orderSheet"
	};
	toggle = () => {
		let { order } = this.props;
		this.setState(
			{
				modal: !this.state.modal
			},
			() => {
				if (this.state.modal) {
					this.props.getNotes(order.orderNum);
					this.props.getPayments(order.orderNum);
					this.props.getClaims(order.orderNum);
					this.props.getOrderedSkus(order.orderNum);
				} else {
					this.props.clearOrderedSkus();
					this.props.clearNotes();
					this.props.clearPayments();
					this.props.clearClaims();
				}
			}
		);
	};
	setDeleteInput = e => {
		this.setState({
			delete: e.target.value
		});
	};
	deleteOrder = () => {
		let {
			payments,
			notes,
			claims,
			orderedSkus,
			deleteClaim,
			deleteItem,
			deleteNote,
			deletePayment,
			deleteOrderedSku
		} = this.props;
		if (this.props.order.orderNum === this.state.delete) {
			// Delete all payments for that order
			payments.forEach(payment => {
				deletePayment(payment._id);
			});
			// Delete all notes for that order
			notes.forEach(note => {
				deleteNote(note._id);
			});
			// delete all claims for that order
			claims.forEach(claim => {
				deleteClaim(claim._id);
			});
			// delete all orderedSkus for that order
			orderedSkus.forEach(sku => {
				deleteOrderedSku(sku._id, () => {
					this.props.getItems(this.props.filters, item =>
						this.props.getAlerts(item)
					);
				});
			});
			deleteItem(this.props.order._id);
		} else {
			alert("Wrong value entered");
			this.toggle();
		}
	};
	render() {
		const { order } = this.props;
		return (
			<div>
				{localStorage.token &&
				this.props.auth.user &&
				this.props.auth.user.permissions.find(item => item === "Delete") ? (
					<Button
						className="mb-1"
						block={this.props.noBlock ? false : true}
						color="danger"
						onClick={this.toggle}
					>
						<FontAwesomeIcon icon={faTrashAlt} />
					</Button>
				) : null}
				<Modal isOpen={this.state.modal} toggle={this.toggle} size="xl">
					<ModalHeader toggle={this.toggle}>
						<Container>
							<Row>
								<Col>Deleteing Order: {` ${this.props.order.orderNum}`} </Col>
							</Row>
						</Container>
					</ModalHeader>
					<ModalBody>
						<Container>
							<Row>
								<Col>
									Are you sure you would like to <strong>DELETE</strong> this
									order?
								</Col>
							</Row>
							<Row className="mt-5 mb-5">
								<Input
									type="text"
									placeholder="Type in the ORDER NUMBER here to DELETE"
									onChange={this.setDeleteInput}
								></Input>
							</Row>
							<Row>
								<Button
									onClick={this.toggle}
									className="mb-5"
									block
									color="warning"
								>
									Cancel
								</Button>
								{localStorage.token &&
								this.props.auth.user &&
								this.props.auth.user.permissions.find(
									item => item === "Delete"
								) ? (
									<Button
										onClick={this.deleteOrder}
										className="mb-5"
										block
										color="danger"
									>
										DELETE
									</Button>
								) : null}
							</Row>
						</Container>
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

DeleteModal.propTypes = {
	item: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	item: state.item,
	auth: state.auth,
	notes: state.notes.notes,
	payments: state.payments.payments,
	claims: state.claims.claims,
	orderedSkus: state.orderedSkus.orderedSkus
});

export default connect(
	mapStateToProps,
	{
		getNotes,
		deleteNote,
		clearNotes,
		getPayments,
		deletePayment,
		clearPayments,
		getClaims,
		deleteClaim,
		clearClaims,
		deleteItem,
		getOrderedSkus,
		deleteOrderedSku,
		clearOrderedSkus,
		getItems,
		getAlerts
	}
)(DeleteModal);
