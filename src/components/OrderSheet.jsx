import React, { Component, Fragment } from "react";
import {
	Button,
	Form,
	FormGroup,
	Label,
	Alert,
	Input,
	Container,
	Row,
	Col
} from "reactstrap";
// ----------------------------Components-------------------------------------------
import AddOrderedSkusModal from "./AddOrderedSkusModal";
import OrderedSkuCard from "./OrderedSkuCard";
import ClaimModal from "./ClaimModal";

// ----------------------------Redux-------------------------------------------
import { connect } from "react-redux";
import { addItem, getItems, editItem } from "../actions/itemActions";
import PropTypes from "prop-types";

class OrderSheet extends Component {
	constructor(props) {
		super(props);
		let { order, mode } = this.props;
		let mountOrderProp = {
			...order,
			required: ["name", "date", "orderNum"],
			date: order
				? new Date(order.date).toDateString()
				: new Date(Date.now()).toDateString()
		};

		this.state = mountOrderProp;
		// Need to slim this down and optimize this, this shouldn't be this cluttered and redudant
		// this.state = { ...this.props.order, ...this.props.mode, msg: null };
	}
	selectOrderStatus = e => {
		this.setState({ orderStatus: e.target.name });
	};
	selectOrderStatusNew = e => {
		let options = [...e.target.options].filter(
			option => option.selected === true
		);
		console.log(options.map(item => item.value));
	};
	onChangeDate = e => {
		this.setState({ date: e });
	};
	onChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};
	toggleChecked = e => {
		this.setState({ [e.target.name]: !this.state[e.target.name] }, () => {
			this.setState({
				addrCheck: this.state.billToChecked && this.state.shipToChecked
			});
		});
	};
	onSubmit = e => {
		e.preventDefault();
		const newOrder = this.state;
		// Update Auto Values
		newOrder.lastUpdated = new Date().toString();

		let validation = this.state.required.some(att => newOrder[att] === "");
		if (validation) {
			alert("Please fill out required forms");
		} else {
			// Add item via ADD_ITEM action
			this.props.item.customerOrders.find(
				item => item.orderNum === newOrder.orderNum
			)
				? this.props.editItem(newOrder)
				: this.props.addItem(newOrder);
			// Close Modal
		}
	};
	toggleDropDownOpen = () => {
		this.setState({ dropDownOpen: !this.state.dropDownOpen });
	};
	onChangeDateNew = e => {
		let date = new Date(e.target.value) || Date.now();
		date.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
		this.setState({
			date: new Date(date).toDateString()
		});
	};
	reportProblem = () => {
		alert("Claim Modal yet to be created");
	};
	render() {
		let {
			billToAddress,
			billToState,
			billToZip,
			st,
			shipToAddress,
			shipToZip
		} = this.state;
		let billToInfoEntered = billToAddress && billToState && billToZip;
		let shipToInfoEntered = st && shipToAddress && shipToZip;
		let AddSkus = (
			<Fragment>
				<Row>
					<Col>
						<Label>
							<strong>Order Information</strong>
						</Label>
					</Col>
				</Row>

				<Row>
					<Col>
						<Row>
							<Col>
								<Label for="order">Skus</Label>
							</Col>
						</Row>
						{!this.props.order
							? null
							: this.props.order.orderSkus.map((sku, index) => (
									<OrderedSkuCard
										skuKey={index}
										sku={sku}
										order={this.props.order}
									/>
							  ))}
						<Row>
							<Col>
								<AddOrderedSkusModal
									order={this.state}
									skus={this.props.products}
								/>
							</Col>
						</Row>
					</Col>
				</Row>
			</Fragment>
		);
		let RenderStatusOptions = (
			<Fragment>
				<Col>
					<Label>Order Status</Label>
					{!this.props.order ? null : (
						<Input
							type="select"
							id="multipleStatusSelect"
							onChange={this.selectOrderStatusNew}
							multiple
						>
							<option
								selected={
									this.state.orderStatus.find(item => item === "Pending")
										? true
										: false
								}
							>
								Pending
							</option>
							<option
								disabled={this.props.order.custPaidDate ? false : true}
								selected={
									this.state.orderStatus.find(item => item === "Paid")
										? true
										: false
								}
							>
								Paid
							</option>
							<option
								selected={
									this.state.orderStatus.find(
										item => item === "Processing Order"
									)
										? true
										: false
								}
							>
								Processing Order
							</option>
							<option
								disabled={this.props.order.sentTo ? false : true}
								selected={
									this.state.orderStatus.find(
										item => item === "Sent to Supplier"
									)
										? true
										: false
								}
							>
								Sent to Supplier
							</option>
							<option
								disabled={this.props.order.rcvd ? false : true}
								selected={
									this.state.orderStatus.find(
										item => item === "Received from Supplier"
									)
										? true
										: false
								}
							>
								Received from Supplier
							</option>
							<option
								selected={
									this.state.orderStatus.find(
										item => item === "Ready to ship to Customer"
									)
										? true
										: false
								}
							>
								Ready to ship to Customer
							</option>
							<option
								disabled={this.state.shipped ? false : true}
								selected={
									this.state.orderStatus.find(
										item => item === "Shipped to Customer"
									)
										? true
										: false
								}
							>
								Shipped to Customer
							</option>
							<option
								disabled={this.state.shipped ? false : true}
								selected={
									this.state.orderStatus.find(
										item => item === "Delivered to Customer"
									)
										? true
										: false
								}
							>
								Delivered to Customer
							</option>
						</Input>
					)}
				</Col>
			</Fragment>
		);
		return (
			<Form onSubmit={this.onSubmit}>
				<FormGroup style={{ overflow: "hidden" }}>
					<Container style={{ maxHeight: "30rem", overflow: "auto" }}>
						{this.state.msg ? (
							<Alert color="danger">{this.state.msg}</Alert>
						) : null}
						<section name="Customer Information" className="mb-5">
							<Row>
								<Col>
									<Label>
										<strong>Customer Information</strong>
									</Label>
								</Col>
							</Row>
							<Row>
								<Col>
									<Label style={{ color: "red" }} for="order">
										Order Placed*
									</Label>
									<Input
										placeholder={this.state.date}
										type="text"
										onfocus="(this.type='date')"
										onblur="(this.type='text')"
										onChange={this.onChangeDateNew}
										valid={this.state.date != null}
									></Input>
								</Col>
								<Col>
									<Label style={{ color: "red" }} for="order">
										Order Number*
									</Label>
									<Input
										type="text"
										name="orderNum"
										id="orderNum"
										placeholder="Order Number"
										value={this.state.orderNum || null}
										onChange={this.onChange}
										valid={this.state.orderNum}
										invalid={!this.state.orderNum}
									/>
								</Col>

								{this.props.order ? RenderStatusOptions : null}
							</Row>
							<Row>
								<Col>
									<Label>Order Total</Label>
									<Input
										type="text"
										name="total"
										id="total"
										placeholder="123.50"
										value={this.state.total}
										onChange={this.onChange}
										valid={this.state.total}
										invalid={!this.state.total}
									/>
								</Col>
								<Col>
									<Label for="order">Customer Due</Label>
									<Input
										type="text"
										name="custDue"
										id="custDue"
										placeholder="123.50 auto-fill me"
										onChange={this.onChange}
										value={this.state.custDue}
										valid={this.state.custDue}
										invalid={!this.state.custDue}
									/>
								</Col>
							</Row>
							<Row>
								<Col>
									<Label style={{ color: "red" }} for="order">
										Customer Name / Business Name*
									</Label>
									<Input
										type="text"
										name="name"
										id="name"
										placeholder="John Smith"
										onChange={this.onChange}
										value={this.state.name}
										valid={this.state.name}
										invalid={!this.state.name}
									/>
								</Col>
							</Row>
							<Row>
								<Col>
									<Label for="order">Customer / Business Bill To Address</Label>
									<Input
										type="text"
										name="billToAddress"
										id="billToAddress"
										placeholder="123 Fake st. ste 1"
										onChange={this.onChange}
										valid={this.state.billToAddress}
										invalid={!this.state.billToAddress}
									/>
								</Col>
								<Col>
									<Label for="order">Customer / Business Ship To Address</Label>
									<Input
										type="text"
										name="shipToAddress"
										id="shipToAddress"
										placeholder="123 Fake st. ste 1"
										onChange={this.onChange}
										value={this.state.shipToAddress}
										valid={this.state.shipToAddress}
										invalid={!this.state.shipToAddress}
									/>
								</Col>
							</Row>
							<Row>
								<Col>
									<Label for="order">Bill To State</Label>
									<Input
										type="text"
										name="billToState"
										id="billToState"
										placeholder="NY"
										onChange={this.onChange}
										value={this.state.billToState}
										valid={this.state.billToState}
										invalid={!this.state.billToState}
									/>
								</Col>
								<Col>
									<Label for="order">Bill To Zip Code</Label>
									<Input
										type="text"
										name="billToZip"
										id="billToZip"
										placeholder="10021"
										onChange={this.onChange}
										value={this.state.billToZip}
										valid={this.state.billToZip}
										invalid={!this.state.billToZip}
									/>
								</Col>
								<Col>
									<Label for="order">Ship To State</Label>
									<Input
										type="text"
										name="st"
										id="st"
										placeholder="NY"
										value={this.state.st}
										onChange={this.onChange}
										valid={this.state.st}
										invalid={!this.state.st}
									/>
								</Col>
								<Col>
									<Label for="order">Ship To Zip</Label>
									<Input
										type="text"
										name="shipToZip"
										id="shipToZip"
										placeholder="10021"
										onChange={this.onChange}
										value={this.state.shipToZip}
										valid={this.state.shipToZip}
										invalid={!this.state.shipToZip}
									/>
								</Col>
							</Row>
							{!billToInfoEntered && !shipToInfoEntered ? null : (
								<Row>
									<Col xs={{ size: 6, offset: 1 }}>
										<Input
											name="billToChecked"
											type="checkbox"
											onClick={this.toggleChecked}
											checked={this.state.billToChecked ? true : false}
										/>{" "}
										Bill to address checked?
									</Col>
									<Col>
										<Label check>
											<Input
												name="shipToChecked"
												type="checkbox"
												onClick={this.toggleChecked}
												checked={this.state.shipToChecked ? true : false}
											/>{" "}
											Ship to address checked?
										</Label>
									</Col>
								</Row>
							)}
							<Row>
								<Col>
									<Label for="order">Disclaimer</Label>
									<Input
										type="text"
										name="disclaim"
										id="disclaim"
										onChange={this.onChange}
										value={this.state.disclaim}
										valid={this.state.disclaim}
										invalid={!this.state.disclaim}
									/>
								</Col>
							</Row>
							{this.props.order ? AddSkus : null}
						</section>
						<section name="Kitchenall Information" className="mb-5">
							<Row>
								<Col>
									<Label>
										<strong>Kitchenall Information</strong>
									</Label>
								</Col>
							</Row>
							<Row>
								<Col>
									<Label for="order">NYS Tax Due</Label>
									<Input
										type="number"
										name="nysTax"
										id="nysTax"
										placeholder="123.50 auto-fill me"
										onChange={this.onChange}
										value={this.state.nysTax || null}
										valid={this.state.nysTax}
										invalid={!this.state.nysTax}
									/>
								</Col>
								<Col>
									<Label for="order">CA Tax Due</Label>
									<Input
										type="number"
										name="caTax"
										id="caTax"
										placeholder="123.50 auto-fill me"
										onChange={this.onChange}
										value={this.state.caTax}
										valid={this.state.caTax}
										invalid={!this.state.caTax}
									/>
								</Col>
							</Row>
							<Row>
								<Col>
									<Label for="order">Net Due</Label>
									<Input
										type="number"
										name="netDue"
										id="netDue"
										placeholder="123.50 auto-fill me"
										onChange={this.onChange}
										value={this.state.netDue}
										valid={this.state.netDue}
										invalid={!this.state.netDue}
									/>
								</Col>
								<Col>
									<Label for="order">Total Net</Label>
									<Input
										type="number"
										name="netTotal"
										id="netTotal"
										placeholder="123.50"
										onChange={this.onChange}
										value={this.state.netTotal}
										valid={this.state.netTotal}
										invalid={!this.state.netTotal}
									/>
								</Col>
							</Row>
						</section>
					</Container>
					<Button color="primary" style={{ marginTop: "2rem" }} block>
						Save
					</Button>
					{!this.props.order ? null : <ClaimModal order={this.props.order} />}
				</FormGroup>
			</Form>
		);
	}
}

OrderSheet.propTypes = {
	addItem: PropTypes.func.isRequired,
	editItem: PropTypes.func.isRequired,
	item: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	item: state.item,
	products: state.products.products
});

export default connect(
	mapStateToProps,
	{ addItem, getItems, editItem }
)(OrderSheet);
