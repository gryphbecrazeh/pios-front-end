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
	Col
} from "reactstrap";
// ----------------------------Components-------------------------------------------
import OrderSheet from "./OrderSheet";
// ----------------------------Redux-------------------------------------------
import { connect } from "react-redux";
import PropTypes from "prop-types";

class EditModal extends Component {
	state = {
		modal: true
	};
	toggle = () => {
		this.setState({
			modal: !this.state.modal
		});
	};
	render() {
		const { order } = this.props;
		return (
			<div>
				<Button className="mb-1" block color="warning" onClick={this.toggle} />

				<Modal isOpen={this.state.modal} toggle={this.toggle} size="xl">
					<ModalHeader toggle={this.toggle}>
						<Container>
							<Row>
								<Col>Editting Order: {` ${this.props.order.orderNum}`} </Col>
							</Row>
						</Container>
					</ModalHeader>
					<ModalBody>
						<OrderSheet order={this.props.order} mode="edit" />
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
