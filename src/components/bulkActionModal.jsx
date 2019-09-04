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
	Label,
	Input
} from "reactstrap";
// ----------------------------Components-------------------------------------------
import TableGenerator from "./TableGenerator";

// ----------------------------Redux-------------------------------------------
import { connect } from "react-redux";
import { clearActions } from "../actions/noteActions";

class BulkActionModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false,
			date: Date()
		};
	}
	componentDidUpdate(prevProps) {
		const { error, notes } = this.props;
		if (error !== prevProps.error) {
			// Check for register error
			if (notes.msg === "Save Successful") {
				this.setState({ msg: notes.msg });
			} else {
				this.setState({
					msg: null
				});
			}
		}
		// If authenticated close modal
		if (this.state.modal && notes.success === true) {
			this.toggle();
		}
	}
	getSelection = () => {
		let checkedBoxes = document.querySelectorAll("input:checked");
		let selection = this.props.item.customerOrders.filter(order =>
			[...checkedBoxes].find(box => box.name === order._id)
		);
		if ([...selection].length > 0) {
			this.toggle();
			this.setState(
				{
					selection: selection
				},
				() => console.log(this.state.selection)
			);
		} else {
			alert("Please make a selection");
		}
	};
	toggle = () => {
		this.setState(
			{
				modal: !this.state.modal
			},
			() => {
				this.props.clearActions();
			}
		);
	};
	render() {
		return (
			<div>
				<Button className="mb-1" color="primary" onClick={this.getSelection}>
					Bulk Actions
				</Button>
				<Modal isOpen={this.state.modal} toggle={this.toggle} size="xl">
					<ModalHeader toggle={this.toggle}>
						<Container>
							<Row>
								<Col>Bulk Action Modal</Col>
							</Row>
						</Container>
					</ModalHeader>
					<ModalBody>
						{this.state.modal === true ? (
							<TableGenerator
								pageKeys={["date", "orderNum", "name"]}
								orders={this.state.selection}
								noSelect
								noInteract
							/>
						) : null}
					</ModalBody>
					<ModalFooter>
						<Button block color="success" onClick={this.applyActions}>
							Apply Actions
						</Button>
					</ModalFooter>
				</Modal>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth,
	notes: state.notes,
	item: state.item
});

export default connect(
	mapStateToProps,
	{ clearActions }
)(BulkActionModal);
