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
	Col,
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem
} from "reactstrap";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// ----------------------------Components-------------------------------------------
import AddOrderedSkusModal from "./AddOrderedSkusModal";
import OrderedSkuCard from "./OrderedSkuCard";
// ----------------------------Redux-------------------------------------------
import { connect } from "react-redux";
import { addItem, getItems, editItem } from "../actions/itemActions";
import PropTypes from "prop-types";

class OrderSheet extends Component {
	constructor(props) {
		super(props);
		let { order, mode } = this.props;
		let mountOrderProp = {
			_id: order ? order._id : null,
			required: ["name", "date", "orderNum"],
			name: order ? order.name : "",
			orderNum: order ? order.orderNum : "",
			date: order ? new Date(order.date) : new Date(),
			st: order ? order.st : "",
			mfr: order ? order.mfr : "",
			sentTo: order ? order.sentTo : "",
			custDue: order ? order.custDue : "",
			custPaidDate: order ? order.custPaidDate : "",
			netDue: order ? order.netDue : "",
			netPaidDate: order ? order.netPaidDate : "",
			disclaim: order ? order.disclaim : "",
			addrCheck: order ? order.addrCheck : false,
			rcvd: order ? order.rcvd : "",
			orderSkus: order ? order.skus : [],
			ship: order ? order.ship : "",
			shipped: order ? order.shipped : "",
			total: order ? order.total : "",
			nysTax: order ? order.nysTax : "",
			caTax: order ? order.caTax : "",
			net: order ? order.net : "",
			netCrate: order ? order.netCrate : "",
			netFreigt: order ? order.netFreigt : "",
			notes: order ? order.notes : "",
			lastUpdated: order ? order.lastUpdated : "Item has not been editted",
			msg: null,
			mode: mode ? mode : "view"
		};

		this.state = mountOrderProp;
	}
	selectOrderStatus = e => {
		this.setState({ orderStatus: e.target.name });
	};
	onChangeDate = e => {
		this.setState({ date: e });
	};
	onChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};
	onSubmit = e => {
		e.preventDefault();
		const newOrder = this.state;
		// Update Auto Values
		newOrder.lastUpdated = new Date().toString();
		newOrder.custPaidDate =
			newOrder.custDue === 0 && !newOrder.custPaidDate ? Date.now() : null;

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
			this.setState({
				required: ["name", "date", "orderNum"],
				name: "",
				orderNum: "",
				date: new Date(),
				st: "",
				mfr: "",
				sentTo: "",
				custDue: "",
				custPaidDate: "",
				netDue: "",
				netPaidDate: "",
				disclaim: "",
				addrCheck: "",
				rcvd: "",
				ship: "",
				shipped: "",
				total: "",
				nysTax: "",
				caTax: "",
				orderSkus: [],
				net: "",
				netCrate: "",
				netFreigt: "",
				notes: "",
				dropDownOpen: false,
				orderStatus: null
			});
		}
	};
	toggleDropDownOpen = () => {
		this.setState({ dropDownOpen: !this.state.dropDownOpen });
	};

	render() {
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
							: this.props.order.orderSkus.map(sku => (
									<OrderedSkuCard sku={sku} order={this.props.order} />
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
		return (
			<Form onSubmit={this.onSubmit}>
				<FormGroup style={{ overflow: "hidden" }}>
					<Container style={{ maxHeight: "35rem", overflow: "auto" }}>
						{this.state.msg ? (
							<Alert color="danger">{this.state.msg}</Alert>
						) : null}

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
								<Datepicker
									dateFormat="MM/dd/yyyy"
									selected={this.state.date}
									onChange={this.onChangeDate}
								/>
							</Col>
							<Col>
								<Label>Order Status</Label>
								<Dropdown
									isOpen={this.state.dropDownOpen}
									toggle={this.toggleDropDownOpen}
								>
									<DropdownToggle caret>
										{this.state.orderStatus || "Select order status"}
									</DropdownToggle>
									<DropdownMenu>
										<DropdownItem
											name="Pending"
											onClick={this.selectOrderStatus}
										>
											Pending
										</DropdownItem>
										<DropdownItem name="Paid" onClick={this.selectOrderStatus}>
											Paid
										</DropdownItem>
										<DropdownItem
											name="Processing Order"
											onClick={this.selectOrderStatus}
										>
											Processing Order
										</DropdownItem>
										<DropdownItem
											name="Sent to Supplier"
											onClick={this.selectOrderStatus}
										>
											Sent To Supplier
										</DropdownItem>
										<DropdownItem
											name="Received from Supplier"
											onClick={this.selectOrderStatus}
										>
											Received from Supplier
										</DropdownItem>

										<DropdownItem
											name="Ready To Ship to Customer"
											onClick={this.selectOrderStatus}
										>
											Ready To Ship to Customer
										</DropdownItem>
										<DropdownItem
											name="Shipped to Customer"
											onClick={this.selectOrderStatus}
										>
											Shipped to Customer
										</DropdownItem>
										<DropdownItem
											name="Delivered to Customer"
											onClick={this.selectOrderStatus}
										>
											Delivered to Customer
										</DropdownItem>
									</DropdownMenu>
								</Dropdown>
							</Col>
						</Row>
						<Row>
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
								/>
							</Col>
							<Col>
								<Label style={{ color: "red" }} for="order">
									Order Total*
								</Label>
								<Input
									type="text"
									name="total"
									id="total"
									placeholder="123.50"
									value={this.state.total}
									onChange={this.onChange}
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
								/>
							</Col>
						</Row>
						<Row>
							<Col>
								<Label for="order">Customer Due</Label>
								<Input
									type="text"
									name="custDue"
									id="custDue"
									placeholder="123.50 auto-fill me"
									onChange={this.onChange}
									value={this.state.custDue}
								/>
							</Col>
							<Col>
								<Label for="order">Customer Paid</Label>
								<Input
									type="text"
									name="custPaid"
									id="custPaid"
									placeholder="0.00"
									onChange={this.onChange}
									value={this.state.custPaid}
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
									value={this.state.billToAddress}
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
								/>
							</Col>
						</Row>
						<Row>
							<Col>
								<Label for="order">Disclaimer</Label>
								<Input
									type="text"
									name="disclaim"
									id="disclaim"
									onChange={this.onChange}
								/>
							</Col>
						</Row>
						{this.props.order ? AddSkus : null}

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
									type="text"
									name="nysTax"
									id="nysTax"
									placeholder="123.50 auto-fill me"
									onChange={this.onChange}
									value={this.state.nysTax || null}
								/>
							</Col>{" "}
							<Col>
								<Label for="order">CA Tax Due</Label>
								<Input
									type="text"
									name="caTax"
									id="caTax"
									placeholder="123.50 auto-fill me"
									onChange={this.onChange}
									value={this.state.caTax || null}
								/>
							</Col>
						</Row>
						<Row>
							<Col>
								<Label for="order">Net Due</Label>
								<Input
									type="text"
									name="netDue"
									id="netDue"
									placeholder="123.50 auto-fill me"
									onChange={this.onChange}
								/>
							</Col>
							<Col>
								<Label for="order">Net Paid</Label>
								<Input
									type="text"
									name="net-paid"
									id="net-paid"
									placeholder="0.00"
									onChange={this.onChange}
								/>
							</Col>
							<Col>
								<Label for="order">Total Net</Label>
								<Input
									type="text"
									name="net-total"
									id="net-total"
									placeholder="123.50"
									onChange={this.onChange}
								/>
							</Col>
						</Row>
						<Row>
							<Col>
								<Label>
									<strong>Kitchenall Shipping</strong>
								</Label>
							</Col>
						</Row>
						<Row>
							<Col>
								<Label for="order">Net Crate</Label>
								<Input
									type="text"
									name="net-crate"
									id="net-crate"
									placeholder="123.50"
									onChange={this.onChange}
								/>
							</Col>
							<Col>
								<Label for="order">Net Freigt</Label>
								<Input
									type="text"
									name="net-freight"
									id="net-freight"
									placeholder="123.50"
									onChange={this.onChange}
								/>
							</Col>
						</Row>

						<Row>
							<Col>
								<Label for="order">Order Sent To</Label>
								<Input
									type="text"
									name="sentTo"
									id="sentTo"
									placeholder="KAS"
									onChange={this.onChange}
								/>
							</Col>
							<Col>
								<Label for="order">Order Received From</Label>
								<Input
									type="text"
									name="rcvd"
									id="rcvd"
									placeholder="KAS"
									onChange={this.onChange}
								/>
							</Col>
							<Col>
								<Label for="order">Order Ship VIA</Label>
								<Input
									type="text"
									name="ship"
									id="ship"
									placeholder="Kitchenall"
									onChange={this.onChange}
								/>
							</Col>
						</Row>
					</Container>
					<Button color="primary" style={{ marginTop: "2rem" }} block>
						Save
					</Button>
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
