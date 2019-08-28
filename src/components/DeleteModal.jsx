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
import { getNotes, clearNotes } from "../actions/noteActions";
import { getPayments } from "../actions/paymentActions";
import { deleteItem } from "../actions/itemActions";

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
				if (this.state.modal) this.props.getNotes(order.orderNum);
				else {
					this.props.clearNotes();
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
		if (this.props.order.orderNum === this.state.delete)
			this.props.deleteItem(this.props.order._id);
		else {
			alert("Wrong value entered");
			this.toggle();
		}
	};
	render() {
		const { order } = this.props;
		return (
			<div>
				<Button
					className="mb-1"
					block={this.props.noBlock ? false : true}
					color="danger"
					onClick={this.toggle}
				>
					<FontAwesomeIcon icon={faTrashAlt} />
				</Button>

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

								<Button
									onClick={this.deleteOrder}
									className="mb-5"
									block
									color="danger"
								>
									DELETE
								</Button>
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
	item: PropTypes.object.isRequired,
	users: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	item: state.item,
	users: state.users,
	notes: state.notes.notes
});

export default connect(
	mapStateToProps,
	{ getNotes, clearNotes, getPayments, deleteItem }
)(DeleteModal);
