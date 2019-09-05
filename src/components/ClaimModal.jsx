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
	Col,
	Label,
	Input,
	Form,
	FormGroup
} from "reactstrap";
// ----------------------------Components-------------------------------------------
// ----------------------------Redux-------------------------------------------
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addClaim, clearActions } from "../actions/claimsAction";

class ClaimModal extends Component {
	constructor(props) {
		super(props);
		let { order, auth } = this.props;
		this.state = {
			...order,
			category: "Customer Order",
			claim_status: "Pending",
			modal: false,
			user: auth.user.name,
			date_purchased: new Date(order.date).toDateString(),
			order_number: order.orderNum,
			customer_order: order._id,
			date_reported: order
				? new Date(order.date).toDateString()
				: new Date(Date.now()).toDateString()
		};
	}
	componentDidUpdate(prevProps) {
		const { error, claims } = this.props;
		if (error !== prevProps.error) {
			// Check for register error
			if (claims.msg === "Save Successful") {
				this.setState({ msg: claims.msg });
			} else {
				this.setState({
					msg: null
				});
			}
		}
		// If authenticated close modal
		if (this.state.modal && claims.success === true) {
			this.toggle();
		}
	}
	toggle = () => {
		this.props.clearActions();
		this.setState({
			modal: !this.state.modal
		});
	};
	onChangeDateNew = e => {
		let date = new Date(e.target.value) || Date.now();
		date.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
		this.setState({
			[e.target.name]: new Date(date).toDateString()
		});
	};
	selectOrderStatus = e => {
		let options = [...e.target.options]
			.filter(option => option.selected === true)
			.map(option => option.value);
		this.setState({
			[e.target.name]: [...options]
		});
	};
	onChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};
	createClaim = () => {
		let newClaim = {
			...this.state
		};
		delete newClaim._id;
		this.props.addClaim(newClaim);
	};
	render() {
		let ProductClaim = (
			<Fragment>
				<Row className="mt-3">
					<Col>
						<strong>Product Claim</strong>
					</Col>
				</Row>
				<Row>
					<Col>
						<Label>Date Purchased</Label>
						<Input
							placeholder={this.state.date_purchased || "When was it purchased"}
							type="text"
							onfocus="(this.type='date')"
							onblur="(this.type='text')"
							onChange={this.onChangeDateNew}
							valid={this.state.date_purchased != null}
							name="date_purchased"
						></Input>
					</Col>
					<Col>
						<Label>Date Delivered</Label>
						<Input
							placeholder={
								this.state.date_delivered || "Has it been delivered?"
							}
							type="text"
							onfocus="(this.type='date')"
							onblur="(this.type='text')"
							onChange={this.onChangeDateNew}
							valid={this.state.date_delivered != null}
							name="date_delivered"
						></Input>
					</Col>
				</Row>
				<Row>
					<Col>
						<Label>Product Tracking Number</Label>
						<Input
							onChange={this.onChange}
							type="text"
							placeholder={
								this.state.sku_tracking_number ||
								"Please enter shipment tracking number"
							}
							valid={this.state.sku_tracking_number != null}
							name="sku_tracking_number"
						></Input>
					</Col>

					<Col>
						<Label>Product Condition</Label>
						<Input
							onChange={this.onChange}
							type="text"
							placeholder="Product Condition"
							valid={this.state.sku_condition != null}
							name="sku_condition"
						></Input>
					</Col>
				</Row>

				<Row>
					<Col>
						<Label>Manufacturer</Label>
						<Input
							onChange={this.onChange}
							type="text"
							placeholder="Manufacturer"
							valid={this.state.manufacturer != null}
							name="manufacturer"
						></Input>
					</Col>
					<Col>
						<Label>Vendor</Label>
						<Input
							onChange={this.onChange}
							type="text"
							placeholder="Vendor"
							valid={this.state.vendor != null}
							name="vendor"
						></Input>
					</Col>
				</Row>
				<Row>
					<Col>
						<Label>Product Sku</Label>
						<Input
							onChange={this.onChange}
							type="text"
							placeholder="Claimed Sku"
							valid={this.state.claimed_skus != null}
							name="claimed_skus"
						></Input>
					</Col>
					<Col>
						<Label>Product Quantity</Label>
						<Input
							onChange={this.onChange}
							type="text"
							placeholder="Product Quantity Ordered"
							valid={this.state.claimed_skus != null}
							name="skus_quantity"
						></Input>
					</Col>
				</Row>
				<Row>
					<Col>
						<Label>Claim Action</Label>
						<Input
							onChange={this.onChange}
							type="select"
							valid={this.state.claim_action != null}
							name="claim_action"
						>
							<option
								valid={this.state.claim_action === "Replace" ? true : false}
							>
								Replace
							</option>
							<option
								valid={this.state.claim_action === "Service" ? true : false}
							>
								Service
							</option>
							<option
								valid={
									this.state.claim_action === "Manufacturer" ? true : false
								}
							>
								Manufacturer Warranty
							</option>
						</Input>
					</Col>
				</Row>
				<Row>
					<Col>
						<Label>Replacement Sku</Label>
						<Input
							onChange={this.onChange}
							type="text"
							placeholder={
								this.state.claimed_skus || "Please enter replacement sku"
							}
							valid={this.state.replacement_skus != null}
							name="replacement_skus"
						></Input>
					</Col>

					<Col>
						<Label>Freight Cost to Ship Replacement</Label>
						<Input
							onChange={this.onChange}
							type="number"
							placeholder="123.50"
							valid={this.state.cost_freight != null}
							name="cost_freight"
						></Input>
					</Col>
				</Row>
			</Fragment>
		);
		return (
			<div className="claim-container" style={{ maxHeight: "18.75em" }}>
				{this.props.auth.user.roles.find(
					item => item === "Asset Protection"
				) ? (
					<Button
						className="mb-1 mt-2"
						block
						color="danger"
						onClick={this.toggle}
					>
						Report a problem with this order
					</Button>
				) : null}
				<Modal isOpen={this.state.modal} toggle={this.toggle} size="xl">
					<Form onSubmit={this.createClaim}>
						<ModalHeader toggle={this.toggle}>
							<Container>
								<Row>
									<Col>
										Creating Claim for order: {` ${this.props.order.orderNum}`}{" "}
									</Col>
								</Row>
							</Container>
						</ModalHeader>
						<ModalBody>
							<FormGroup>
								<Container style={{ maxHeight: "35rem", overflow: "auto" }}>
									<Row>
										<Col>User: {this.state.user}</Col>
									</Row>
									<Row>
										<Col>
											<Label>Claim Status</Label>
											<Input
												placeholder={this.state.claim_status}
												type="select"
												onChange={this.selectOrderStatus}
												valid={this.state.claim_status != null}
												name="claim_status"
												multiple
											>
												<option
													selected={
														this.state.claim_status === "Pending" ? true : false
													}
												>
													Pending
												</option>
												<option
													selected={
														this.state.claim_status === "Active" ? true : false
													}
												>
													Active
												</option>
												<option
													selected={
														this.state.claim_status === "Resolved"
															? true
															: false
													}
												>
													Resolved
												</option>
												<option
													selected={
														this.state.claim_status === "Replacement Shipped"
															? true
															: false
													}
												>
													Replacement Shipped
												</option>
												<option
													selected={
														this.state.claim_status === "Replacement Delivered"
															? true
															: false
													}
												>
													Replacement Delivered
												</option>

												<option
													selected={
														this.state.claim_status === "Closed" ? true : false
													}
												>
													Closed
												</option>
											</Input>
										</Col>
										<Col>
											<Label>Category</Label>
											<Input
												placeholder={this.state.category}
												type="select"
												onChange={this.onChange}
												valid={this.state.category ? true : false}
												invalid={!this.state.category ? true : false}
												name="category"
											>
												<option
													selected={
														this.state.category === "Customer Order"
															? true
															: false
													}
												>
													Customer Order
												</option>
												<option
													selected={
														this.state.category === "Customer Shipment"
															? true
															: false
													}
												>
													Customer Shipment
												</option>
												<option
													selected={
														this.state.category === "Customer Delivery"
															? true
															: false
													}
												>
													Customer Delivery
												</option>
												<option
													selected={
														this.state.category === "Vendor Order"
															? true
															: false
													}
												>
													Vendor Order
												</option>
												<option
													selected={
														this.state.category === "Vendor Shipment"
															? true
															: false
													}
												>
													Vendor Shipment
												</option>
												<option
													selected={
														this.state.category === "Vendor Delivery"
															? true
															: false
													}
												>
													Vendor Delivery
												</option>
											</Input>
										</Col>
									</Row>
									<Row>
										<Col>
											<Label>Date Reported</Label>
											<Input
												placeholder={this.state.date_reported}
												type="text"
												onfocus="(this.type='date')"
												onblur="(this.type='text')"
												onChange={this.onChangeDateNew}
												valid={this.state.date_reported != null}
												name="date_reported"
											></Input>
										</Col>
										<Col>
											<Label>Date Responded</Label>
											<Input
												placeholder={
													this.state.date_responded || "Not Yet Responded"
												}
												type="text"
												onfocus="(this.type='date')"
												onblur="(this.type='text')"
												onChange={this.onChangeDateNew}
												name="date_responded"
												valid={this.state.date_responded ? true : false}
											></Input>
										</Col>
									</Row>
									<Row>
										<Col>
											<Label>Subject</Label>
											<Input
												onChange={this.onChange}
												name="subject"
												type="text"
												placeholder="Subect"
												valid={this.state.subject ? true : false}
												invalid={!this.state.subject ? true : false}
											></Input>
										</Col>
									</Row>
									<Row>
										<Col>
											<Label>Description</Label>
											<Input
												onChange={this.onChange}
												name="body"
												type="textarea"
												placeholder="Explain the claim in depth"
												valid={this.state.body ? true : false}
												invalid={!this.state.body ? true : false}
											></Input>
										</Col>
									</Row>
									{ProductClaim}
									<Row>
										<Col>
											<Label>Note</Label>
											<Input
												onChange={this.onChange}
												name="note"
												type="textarea"
												placeholder="Explain the claim in depth"
												valid={this.state.note != null}
											></Input>
										</Col>
									</Row>
								</Container>
							</FormGroup>
						</ModalBody>
						<ModalFooter>
							<Button block color="success" type="submit">
								Save Claim
							</Button>
						</ModalFooter>
					</Form>
				</Modal>
			</div>
		);
	}
}

ClaimModal.propTypes = {
	users: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	claims: state.claims
});

export default connect(
	mapStateToProps,
	{ addClaim, clearActions }
)(ClaimModal);
