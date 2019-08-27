// ----------------------------React-------------------------------------------
import React, { Component } from "react";
import classnames from "classnames";
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
	TabContent,
	TabPane,
	Nav,
	NavItem,
	NavLink,
	Badge
} from "reactstrap";
// ----------------------------Components-------------------------------------------
import OrderSheet from "./OrderSheet";
import NotesList from "./NotesList";
// ----------------------------Fontawesome-------------------------------------------
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/pro-regular-svg-icons";

// ----------------------------Redux-------------------------------------------
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getNotes, clearNotes } from "../actions/noteActions";

class EditModal extends Component {
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
	toggleTab = tab => {
		if (this.state.activeTab !== tab) {
			this.setState({
				activeTab: tab
			});
		}
	};
	render() {
		const { order } = this.props;
		return (
			<div>
				<Button className="mb-1" block color="warning" onClick={this.toggle}>
					<FontAwesomeIcon icon={faPencil} />
				</Button>

				<Modal isOpen={this.state.modal} toggle={this.toggle} size="xl">
					<ModalHeader toggle={this.toggle}>
						<Container>
							<Row>
								<Col>Editting Order: {` ${this.props.order.orderNum}`} </Col>
							</Row>
						</Container>
					</ModalHeader>
					<ModalBody>
						<Nav tabs>
							<NavItem>
								<NavLink
									className={classnames({
										active: this.state.activeTab === "orderSheet"
									})}
									onClick={() => {
										this.toggleTab("orderSheet");
									}}
								>
									Order Sheet
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink
									className={classnames({
										active: this.state.activeTab === "notes"
									})}
									onClick={() => {
										this.toggleTab("notes");
									}}
								>
									Notes
									{this.props.notes ? (
										<Badge color="warning">{this.props.notes.length}</Badge>
									) : null}
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink
									className={classnames({
										active: this.state.activeTab === "changes"
									})}
									onClick={() => {
										this.toggleTab("changes");
									}}
								>
									Changes
								</NavLink>
							</NavItem>
						</Nav>
						<TabContent activeTab={this.state.activeTab}>
							<TabPane tabId="orderSheet">
								<OrderSheet order={this.props.order} mode="edit" />
							</TabPane>
							<TabPane tabId="notes">
								<NotesList order={this.props.order} active={this.state.modal} />
							</TabPane>
							<TabPane tabId="changes">Changes will be stored here</TabPane>
						</TabContent>
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
	users: state.users,
	notes: state.notes.notes
});

export default connect(
	mapStateToProps,
	{ getNotes, clearNotes }
)(EditModal);
