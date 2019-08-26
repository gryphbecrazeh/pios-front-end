import React, { Component, Fragment } from "react";
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Container,
	Row,
	Col,
	Input,
	Popover,
	PopoverHeader,
	PopoverBody,
	Label
} from "reactstrap";
// ----------------------------Components-------------------------------------------
import { editItem } from "../actions/itemActions";
// ----------------------------Redux-------------------------------------------
import { connect } from "react-redux";
import PropTypes from "prop-types";

class AddOrderedSkusModal extends Component {
	state = {
		modal: false,
		popoverOpen: false,
		popoverValue: ""
	};
	findSku = e => {
		if (!e.target.value || e.target.value === "") this.togglePopover(false);
		else {
			this.setState({ popoverValue: e.target.value }, () => {
				if (this.state.popoverOpen === false)
					this.setState({ popoverOpen: true });
			});
		}
	};
	RenderSku = () => {
		let res = !this.state.selectedSku ? null : (
			<div>
				<Row>
					<Col>
						Manufacturer Sku:
						{this.state.selectedSku
							? ` ${this.state.selectedSku.manufacturerSku}`
							: null}
					</Col>
					<Col>
						<div>
							Manufacturer:
							{this.state.selectedSku
								? ` ${this.state.selectedSku.manufacturer}`
								: null}
						</div>
					</Col>
					<Col>
						<div>
							Kitchenall.com Cost:
							{this.state.selectedSku
								? ` $${this.state.selectedSku.cost}`
								: null}
						</div>
					</Col>
					<Col>Weight: {`${this.state.selectedSku.weight} lbs.`}</Col>
				</Row>
				<Row className="mt-3">
					<Col>
						<Label>Product Quantity</Label>
						<Input onChange={this.setQuantity} placeholder="Order Quantity" />
					</Col>
					<Col>
						<Label>Purchase Product From</Label>

						<Input onChange={this.setDealer} placeholder="Dealer" />
					</Col>
				</Row>
				<Button
					onClick={this.saveSku}
					className="mt-3 mb-3"
					block
					color="primary"
				>
					Add sku to order
				</Button>
			</div>
		);
		return res;
	};
	setQuantity = e => {
		let sku = this.state.selectedSku;
		sku.quantity = e.target.value;
		this.setState({ selectedSku: sku });
	};
	setDealer = e => {
		let sku = this.state.selectedSku;
		sku.dealer = e.target.value;
		this.setState({ selectedSku: sku });
	};
	saveSku = e => {
		e.preventDefault();
		let updatedOrder = this.props.order;
		let sku = this.state.selectedSku;
		sku.shipmentStatus = "ready";
		sku.dateAdded = Date();

		updatedOrder.orderSkus =
			updatedOrder.orderSkus === undefined
				? []
				: [...updatedOrder.orderSkus, sku];
		this.props.editItem(updatedOrder);
	};
	clearSearch = () => {
		document.querySelector("#sku").value = "";
		this.setState({
			selectedSku: null,
			popoverValue: "",
			popoverOpen: false
		});
	};
	selectSku = sku => {
		this.setState({
			selectedSku: sku
		});
		this.togglePopover(false);
		// this.clearSearch();
	};
	toggle = () => {
		this.setState({
			modal: !this.state.modal
		});
	};
	togglePopover = status => {
		this.setState({
			popoverOpen: status || !this.state.popoverOpen
		});
	};
	render() {
		let foundSkus = this.props.skus.filter(
			item =>
				item.sku.match(new RegExp(this.state.popoverValue, "gmi")) ||
				item.manufacturerSku.match(new RegExp(this.state.popoverValue, "gmi"))
		);
		foundSkus = foundSkus.splice(0, 5);
		return (
			<div className="">
				<Container>
					<Button
						color="primary"
						style={{ marginBottom: "2rem" }}
						onClick={this.toggle}
					>
						Add Sku(s) to Order
					</Button>
					<Modal isOpen={this.state.modal} toggle={this.toggle} size="xl">
						<ModalHeader toggle={this.toggle}>Add Sku to Order </ModalHeader>
						<ModalBody>
							<Container>
								<Row className="mb-2">
									<Col className="text-nowrap">Search for a product to add</Col>
									<Col xs="7">
										<Input
											id="sku"
											type="text"
											placeholder={
												this.state.selectedSku
													? this.state.selectedSku.sku
													: "Enter Product Sku"
											}
											onChange={this.findSku}
										/>
										<Popover
											placement="bottom"
											isOpen={this.state.popoverOpen}
											target="sku"
											toggle={this.togglePopover}
										>
											<PopoverHeader>
												{foundSkus.map(sku => {
													return (
														<Button
															block
															onClick={this.selectSku.bind(this, sku)}
														>
															{sku.manufacturer} {sku.sku}
														</Button>
													);
												})}
											</PopoverHeader>
											<PopoverBody>Render Selections Here</PopoverBody>
										</Popover>
									</Col>
									<Col>
										<Button onClick={this.clearSearch} type="button">
											Clear
										</Button>
									</Col>
								</Row>
								{this.RenderSku()}
							</Container>
						</ModalBody>
						<ModalFooter>Required Fields Are Red Followed By '*'</ModalFooter>
					</Modal>
				</Container>
			</div>
		);
	}
}
AddOrderedSkusModal.propTypes = { editItem: PropTypes.func.isRequired };

const mapStateToProps = state => ({});

export default connect(
	mapStateToProps,
	{ editItem }
)(AddOrderedSkusModal);
