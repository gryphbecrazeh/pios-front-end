import React, { Component } from "react";
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	Container,
	ModalFooter
} from "reactstrap";
// ----------------------------Components-------------------------------------------
import TableGenerator from "./TableGenerator";
// ----------------------------Redux-------------------------------------------
import { connect } from "react-redux";
import { addFilter } from "../actions/filterActions";
import { stat } from "fs";
class AlertViewModal extends Component {
	state = {
		modal: false
	};
	toggle = () => {
		this.setState(
			{
				modal: !this.state.modal
			},
			() =>
				this.props.addFilter({
					showAll: this.state.modal
				})
		);
	};
	render() {
		let { array, key } = this.props.alert;
		return (
			<div className="">
				<Container>
					{this.props.auth.user.permissions.find(item => item === "View") ? (
						<Button
							className="text-nowrap"
							color="danger"
							onClick={this.toggle}
						>
							View Now
						</Button>
					) : null}
					<Modal isOpen={this.state.modal} toggle={this.toggle} size="xl">
						<ModalHeader toggle={this.toggle}>
							{array.length} {array.length > 1 ? "orders " : "order "}
							{key.alert}...
						</ModalHeader>
						<ModalBody>
							{this.state.modal === true ? (
								<TableGenerator
									pageKeys={[
										"date",
										"orderNum",
										"name",
										`${key.value}`,
										...(key.relatedKeys || ""),
										"lastUpdated"
									]}
									orders={array}
								/>
							) : null}
						</ModalBody>
						<ModalFooter>Please fix the orders above...</ModalFooter>
					</Modal>
				</Container>
			</div>
		);
	}
}
AlertViewModal.propTypes = {};

const mapStateToProps = state => ({
	filters: state.filters,
	auth: state.auth
});

export default connect(
	mapStateToProps,
	{ addFilter }
)(AlertViewModal);
