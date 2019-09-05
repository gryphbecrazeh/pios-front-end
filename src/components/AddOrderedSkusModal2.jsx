// ----------------------------React-------------------------------------------
import React, { Component, Fragment } from "react";
// ----------------------------Reactstrap-------------------------------------------
import {
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Card,
	CardHeader,
	CardText,
	CardTitle,
	CardSubtitle,
	Label,
	Alert,
	CardBody,
	Container,
	Row,
	Col,
	Button,
	Input,
	InputGroup,
	InputGroupAddon
} from "reactstrap";
// ----------------------------Components-------------------------------------------
// ----------------------------Redux-------------------------------------------
import { connect } from "react-redux";
import { addOrderedSku, clearActions } from "../actions/orderedSkuActions";
class AddOrderedSkusModal extends Component {
	state = {
		modal: false
	};
	componentDidUpdate(prevProps) {
		const { error, orderedSkus } = this.props;
		if (error !== prevProps.error) {
			// Check for register error
			if (orderedSkus.msg === "Save Successful") {
				this.setState({ msg: orderedSkus.msg });
			} else {
				this.setState({
					msg: null
				});
			}
		}
		// If authenticated close modal
		if (this.state.modal && orderedSkus.success === true) {
			this.toggle();
		}
	}
	toggle = () => {
		this.props.clearActions();
		this.setState({
			modal: !this.state.modal
		});
	};
	showIf = (name, item, altValue) => {
		if (item) {
			return <Col>{`${name} ${altValue || item}`}</Col>;
		} else return null;
	};
	onChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};
	changeSearch = e => {
		this.setState({
			query: e.target.value
		});
	};
	clearSearch = () => {
		this.setState({
			selected: null
		});
	};
	selectItem = e => {
		let { products } = this.props;
		this.setState({
			selected: products.find(item => item.sku === e.target.value)
		});
	};
	addProduct = () => {
		let { addOrderedSku, order, auth } = this.props;
		let newProduct = {
			...this.state,
			...this.state.selected,
			order_number: order.orderNum,
			customer_order: order._id,
			order_placed: order.date,
			user: auth.user.name
		};
		delete newProduct._id;
		addOrderedSku(newProduct);
	};
	render() {
		const { order, products } = this.props;
		let { selected } = this.state;
		let SearchRes = (
			<Fragment>
				{!this.state.query
					? null
					: products
							.filter(
								item =>
									item.sku.match(new RegExp(this.state.query, "gmi")) ||
									item.manufacturerSku.match(
										new RegExp(this.state.query, "gmi")
									)
							)
							.slice(0, 10)
							.map(item => (
								<Row key={item._id} className="mt-1 mb-1">
									<Col>
										<Card>
											<CardBody>
												<Row>
													<Col className="text-nowrap" xs="9">
														{`${item.brand || null} ${item.sku}`}
														{!item.manufacturerSku
															? null
															: ` aka ${item.manufacturerSku}`}
													</Col>
													<Col>
														<Button onClick={this.selectItem} value={item.sku}>
															Select this item
														</Button>
													</Col>
												</Row>
											</CardBody>
										</Card>
									</Col>
								</Row>
							))}
			</Fragment>
		);
		let SkuData = (
			<Fragment>
				{!selected ? null : (
					<Card className="mt-5">
						<CardHeader>
							<strong>{`Product Sku: ${selected.sku}`}</strong>
							{` Manufacturer Sku: ${selected.manufacturerSku}`}
							{this.state.msg ? (
								<Alert color="danger">{this.state.msg}</Alert>
							) : null}
						</CardHeader>
						<CardBody>
							<Container>
								<Row className="mt-2">
									{this.showIf("Model Status : ", selected.status)}
								</Row>
								<Row className="mt-2">
									{this.showIf("Brand : ", selected.brand)}
									{this.showIf("Manufacturer :", selected.manufacterer)}
									{this.showIf("Vendor : ", selected.distributer)}
								</Row>
								<Row className="mt-2">
									{this.showIf("MAP : $", selected.priceMap)}
									{this.showIf("List Price : $", selected.priceList)}
									{this.showIf("Price : $", selected.price)}
									{this.showIf("Local Price : $", selected.priceLocal)}
									{this.showIf("Special Price : $", selected.priceSpecial)}
								</Row>
								<Row className="mt-2">
									<Col xs="9">
										<Label>Sale Price</Label>
										<InputGroup>
											<InputGroupAddon addonType="prepend">$</InputGroupAddon>
											<Input
												type="number"
												placeholder="Price Sold At"
												name="salePrice"
												onChange={this.onChange}
												invalid={!this.state.salePrice ? true : false}
											/>
										</InputGroup>
									</Col>
									<Col>
										<Label>Qty.</Label>
										<Input
											type="number"
											placeholder="Qty."
											name="skus_quantity"
											onChange={this.onChange}
											invalid={!this.state.skus_quantity ? true : false}
										/>
									</Col>
								</Row>
								<Row className="mt-2">
									{this.showIf("Cost : $", selected.cost)}
									{this.showIf("Daroma Cost : $", selected.costDaroma)}
								</Row>
								<Row className="mt-2">
									{this.showIf(
										"Weight : ",
										selected.weight,
										`${selected.weight} lbs.`
									)}
									{this.showIf(
										"Shipping Weight : ",
										selected.weightShip,
										`${selected.weightShip} lbs.`
									)}
								</Row>
								<Row className="mt-2">
									<Col>
										<Label>Order From</Label>
										<Input
											type="text"
											name="vendor"
											onChange={this.onChange}
											placeholder="Enter Vendor Name"
											invalid={!this.state.vendor ? true : false}
											valid={this.state.vendor ? true : false}
										></Input>
									</Col>
									<Col>
										<Label>Total Cost</Label>
										<InputGroup>
											<InputGroupAddon addonType="prepend">$</InputGroupAddon>
											<Input
												type="number"
												name="totalCost"
												placeholder="Alternate Cost"
												onChange={this.onChange}
												invalid={!this.state.totalCost ? true : false}
											></Input>
										</InputGroup>
									</Col>
								</Row>
								<Row className="mt-2">
									{this.showIf(
										"Last Updated : ",
										selected.dateEditted,
										new Date(selected.dateEditted).toDateString()
									)}
								</Row>
							</Container>
						</CardBody>
					</Card>
				)}
			</Fragment>
		);
		return (
			<div>
				{localStorage.token &&
				this.props.auth.user &&
				this.props.auth.user.permissions.find(item => item === "Create") ? (
					<Button block color="primary" onClick={this.toggle}>
						Add New Sku to Order
					</Button>
				) : null}
				<Modal isOpen={this.state.modal} toggle={this.toggle} size="xl">
					<ModalHeader
						toggle={this.toggle}
					>{`Adding Product to Order ${order.orderNum}`}</ModalHeader>
					<ModalBody>
						<Container style={{ maxHeight: "30em", overflow: "auto" }}>
							<Row className="mt-3">
								<Col xs="9">
									<Input
										type="text"
										placeholder="Search for a product"
										onChange={this.changeSearch}
									></Input>
								</Col>
								<Col>
									{!this.state.selected ? null : (
										<Button onClick={this.clearSearch} color="warning">
											Change Product
										</Button>
									)}
								</Col>
							</Row>
							{!this.state.selected
								? !this.state.modal
									? null
									: SearchRes
								: SkuData}
						</Container>
					</ModalBody>
					<ModalFooter>
						{!this.state.selected ? null : (
							<Button onClick={this.addProduct} block color="success">
								Add Item to Order
							</Button>
						)}
					</ModalFooter>
				</Modal>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	products: state.products.products,
	auth: state.auth,
	orderedSkus: state.orderedSkus
});

export default connect(
	mapStateToProps,
	{ addOrderedSku, clearActions }
)(AddOrderedSkusModal);
