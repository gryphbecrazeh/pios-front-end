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
	Input
} from "reactstrap";
// ----------------------------Components-------------------------------------------
// ----------------------------Redux-------------------------------------------
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addNote } from "../actions/noteActions";
import { timingSafeEqual } from "crypto";

class ClaimModal extends Component {
	constructor(props) {
		super(props);
		let { order, auth } = this.props;
		this.state = {
			...order,
			modal: false,
			user: auth.user.name,
			date_reported: order
				? new Date(order.date).toDateString()
				: new Date(Date.now()).toDateString()
		};
	}
	toggle = () => {
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
	onChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
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
							placeholder={this.state.date_purchased}
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
							placeholder={this.state.date_delivered}
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
				</Row>
				<Row>
					<Col>
						<Label>Freight Cost to ship replacement</Label>
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
			<div className="claim-container">
				<Button
					className="mb-1 mt-2"
					block
					color="danger"
					onClick={this.toggle}
				>
					Report a problem with this order
				</Button>
				<Modal isOpen={this.state.modal} toggle={this.toggle} size="xl">
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
						<Container>
							<Row>
								<Col>User: {this.state.user}</Col>
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
										valid={this.state.date_responded != null}
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
										valid={this.state.subject != null}
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
										valid={this.state.body != null}
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
					</ModalBody>
					<ModalFooter>
						<Button block color="success" onClick={this.saveNote}>
							Save Claim
						</Button>
					</ModalFooter>
				</Modal>
			</div>
		);
	}
}

ClaimModal.propTypes = {
	users: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(
	mapStateToProps,
	{ addNote }
)(ClaimModal);
