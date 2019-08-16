import React, { Component } from "react";
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Form,
	FormGroup,
	Label,
	Input,
	Container,
	Row,
	Col
} from "reactstrap";

import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// ----------------------------Components-------------------------------------------
import UploadOrders from "../components/uploadOrders";

// ----------------------------Redux-------------------------------------------
import { connect } from "react-redux";
import { addItem, getItems } from "../actions/itemActions";
import PropTypes from "prop-types";
class OrderModal extends Component {
	state = {
		modal: false,
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
		net: "",
		netCrate: "",
		netFreigt: "",
		notes: ""
	};
	toggle = () => {
		this.setState({
			modal: !this.state.modal,
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
			net: "",
			netCrate: "",
			netFreigt: "",
			notes: ""
		});
	};
	onChangeDate = e => {
		this.setState({ date: e });
	};
	onChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};
	onSubmit = e => {
		e.preventDefault();
		const newOrder = {
			name: this.state.name,
			orderNum: this.state.orderNum,
			date: this.state.date,
			st: this.state.st,
			mfr: this.state.mfr,
			sentTo: this.state.sentTo,
			custDue: this.state.custDue,
			custPaidDate: this.state.custPaidDate,
			netDue: this.state.netDue,
			netPaidDate: this.state.netPaidDate,
			disclaim: this.state.disclaim,
			addrCheck: this.state.addrCheck,
			rcvd: this.state.rcvd,
			ship: this.state.ship,
			shipped: this.state.shipped,
			total: this.state.total,
			nysTax: this.state.nysTax,
			caTax: this.state.caTax,
			net: this.state.net,
			netCrate: this.state.netCrate,
			netFreigt: this.state.netFreigt,
			notes: this.state.notes
		};
		let validation = this.state.required.some(att => newOrder[att] === "");
		if (validation) {
			alert("Please fill out required forms");
		} else {
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
				net: "",
				netCrate: "",
				netFreigt: "",
				notes: ""
			});
			// Add item via ADD_ITEM action
			this.props.addItem(newOrder);

			// Close Modal
			this.toggle();
		}
	};

	render() {
		return (
			<div className="md-12 offset-10">
				<Button
					light
					color="primary"
					style={{ marginBottom: "2rem" }}
					onClick={this.toggle}
				>
					Add Customer Order(s)
				</Button>
				<Modal isOpen={this.state.modal} toggle={this.toggle} size="xl">
					<ModalHeader toggle={this.toggle}>Add Customer Order(s)</ModalHeader>
					<ModalBody>
						<Container>
							<Row>
								<Col>
									<UploadOrders />
								</Col>
							</Row>
							<Row>
								<Col>
									<div className="text-center">OR</div>
								</Col>
							</Row>
						</Container>
						<Form onSubmit={this.onSubmit}>
							<FormGroup>
								<Container>
									<Row>
										<Col>
											<Label style={{ color: "red" }} for="order">
												Order Placed*
											</Label>
											<Datepicker
												dateFormat="MM/dd/yyyy"
												selected={this.state.date}
												onChange={this.onChangeDate}
												name="date"
												id="date"
											/>
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
												onChange={this.onChange}
											/>
										</Col>
										<Col>
											<Label style={{ color: "red" }} for="order">
												Customer Name*
											</Label>
											<Input
												type="text"
												name="name"
												id="name"
												placeholder="John Smith"
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
					</ModalBody>
					<ModalFooter>Required Fields Are Red Followed By '*'</ModalFooter>
				</Modal>
			</div>
		);
	}
}
OrderModal.propTypes = {
	addItem: PropTypes.func.isRequired,
	item: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	item: state.item
});

export default connect(
	mapStateToProps,
	{ addItem, getItems }
)(OrderModal);
