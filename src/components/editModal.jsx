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
import PaymentsList from "./PaymentsList";
import OrderedSkuList from "./OrderedSkuList";
// ----------------------------Fontawesome-------------------------------------------
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/pro-regular-svg-icons";

// ----------------------------Redux-------------------------------------------
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getNotes, clearNotes } from "../actions/noteActions";
import { getPayments, clearPayments } from "../actions/paymentActions";
import { getClaims, clearClaims } from "../actions/claimsAction";
import { getOrderedSkus, clearOrderedSkus } from "../actions/orderedSkuActions";
import { clearErrors } from "../actions/errorActions";

class EditModal extends Component {
	state = {
		modal: false,
		activeTab: "orderSheet"
	};
	componentDidUpdate(prevProps) {
		const { error, item } = this.props;
		if (error !== prevProps.error) {
			// Check for register error
			if (item.msg === "Save Successful") {
				this.setState({ msg: item.msg });
			} else {
				this.setState({
					msg: null
				});
			}
		}
		// If authenticated close modal
		if (this.state.modal && item.success === true) {
			this.toggle();
		}
	}
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
					this.props.clearNotes();
					this.props.clearPayments();
					this.props.clearClaims();
					this.props.clearOrderedSkus();
				}
			}
		);
		this.props.clearErrors();
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
				<Button
					className="mb-1"
					block={this.props.noBlock ? false : true}
					color="warning"
					onClick={this.toggle}
				>
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
						<Nav tabs className="mb-2">
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
										active: this.state.activeTab === "payments"
									})}
									onClick={() => {
										this.toggleTab("payments");
									}}
								>
									Payments{" "}
									{this.props.payments.length > 0 ? (
										<Badge color="success">{this.props.payments.length}</Badge>
									) : null}
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink
									className={classnames({
										active: this.state.activeTab === "skus"
									})}
									onClick={() => {
										this.toggleTab("skus");
									}}
								>
									Skus{" "}
									{this.props.orderedSkus.length > 0 ? (
										<Badge color="primary">
											{this.props.orderedSkus.length}
										</Badge>
									) : null}
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
									Notes{" "}
									{this.props.notes.length > 0 ? (
										<Badge color="warning">{this.props.notes.length}</Badge>
									) : null}
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink
									className={classnames({
										active: this.state.activeTab === "claims"
									})}
									onClick={() => {
										this.toggleTab("claims");
									}}
								>
									Claims{" "}
									{this.props.claims.length > 0 ? (
										<Badge color="danger">{this.props.claims.length}</Badge>
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
									Changes{" "}
								</NavLink>
							</NavItem>
						</Nav>
						<TabContent activeTab={this.state.activeTab}>
							<TabPane tabId="orderSheet">
								<OrderSheet order={this.props.order} mode="edit" />
							</TabPane>
							<TabPane tabId="payments">
								<PaymentsList />
							</TabPane>
							<TabPane tabId="skus">
								<OrderedSkuList order={this.props.order} />
							</TabPane>
							<TabPane tabId="claims">Claims</TabPane>
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
	notes: state.notes.notes,
	payments: state.payments.payments,
	claims: state.claims.claims,
	orderedSkus: state.orderedSkus.orderedSkus,
	error: state.error
});

export default connect(
	mapStateToProps,
	{
		getNotes,
		clearNotes,
		getPayments,
		clearPayments,
		getClaims,
		clearClaims,
		getOrderedSkus,
		clearOrderedSkus,
		clearErrors
	}
)(EditModal);
