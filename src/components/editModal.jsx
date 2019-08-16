// ----------------------------React-------------------------------------------
import React, { Component } from "react";
// ----------------------------Reactstrap-------------------------------------------
import { Modal, ModalBody, ModalHeader } from "reactstrap";
// ----------------------------Redux-------------------------------------------
import { connect } from "react-redux";
import PropTypes from "prop-types";

class EditModal extends Component {
	state = {};
	render() {
		return (
			<div className="edit-modal-container">
				<Modal
					// isOpen={this.props.modals[this.props._id].status}
					isOpen={this.props.Modal}
					toggle={this.props.toggleModal}
				>
					<ModalHeader>Edit Modal</ModalHeader>
					<ModalBody>place input here</ModalBody>
				</Modal>
			</div>
		);
	}
}

EditModal.propTypes = {
	item: PropTypes.object.isRequired,
	users: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	item: state.item,
	users: state.users
});

export default connect(
	mapStateToProps,
	null
)(EditModal);
