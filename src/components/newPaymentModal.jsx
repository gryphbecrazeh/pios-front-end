import React, { Component } from "react";
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
    Dropdown,
    DropdownItem,
    DropdownToggle,
    DropdownMenu,
    ButtonDropdown,
    Form,
    FormGroup,
    Label
} from "reactstrap";
// ----------------------------Components-------------------------------------------
import UploadOrders from "./uploadOrders";
import OrderSheet from "./OrderSheet";
// ----------------------------Redux-------------------------------------------
import { connect } from "react-redux";
import { addItem, getItems,getDBKeys,editItem } from "../actions/itemActions";
import {addPayment} from "../actions/paymentActions"

import PropTypes from "prop-types";
class NewPaymentModal extends Component {
    constructor(props){
		super(props)
		this.state={
			order_id:this.props.order._id,
			order_number:this.props.order.orderNum,
			payment_date:Date.now(),
            user:this.props.auth.user.name,
            modal:false,
            dropdown:false,
            total_due:this.props.order.nysTax
            
		}
    }
	toggle = (target) => {
		this.setState({
			[target]: !this.state[target]
		});
    };
    setTarget=(e)=>{
        this.setState({
            payment_type:e.target.value,
            payment_label:e.target.name
        })
    }
    setNote=e=>{
        this.setState({
            note:e.target.value
        })
    }
    setPaymentAmount=(e)=>{
        this.setState({
            total_paid:e.target.value,
            remaining_balance:Number(this.state.total_due)-Number(e.target.value)
        })
    }
    onSubmit=(e)=>{
        e.preventDefault()
        this.props.addPayment(this.state)
        let updatedItem={
            _id:this.state.order_id,
            orderNum:this.state.order_number,
            [`${this.state.payment_type}Paid`]:Number(this.props.order[`${this.state.payment_type}Paid`])+Number(this.state.total_paid),
            [`${this.state.payment_type}PaidDate`]:this.state.remaining_balance<=0?this.state.payment_date:null,
            [this.state.payment_type]:Number(this.state.total_due)-Number(this.state.total_paid)
        }
        this.props.editItem(updatedItem)
        this.setState({
            total_due:null,
            total_paid:null
        })
    }
	render() {
		return (
			<div className="md-12 offset-10">
				<Button
					light
                    color="primary"
					style={{ marginBottom: "2rem" }}
					onClick={this.toggle.bind(this,"modal")}
					block
				>
					Make a new payment
				</Button>
				<Modal isOpen={this.state.modal} toggle={this.toggle.bind(this,"modal")} size="xl">
					<ModalHeader toggle={this.toggle.bind(this,"modal")}>Make a new payment for order... {this.props.order.orderNum}</ModalHeader>
					<ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                
                        <div>User: {this.state.user.name}</div>
                        <div>Order: {this.state.order_number}</div>
                        <div><ButtonDropdown  isOpen={this.state.dropdown} toggle={this.toggle.bind(this,"dropdown")}>
                                <DropdownToggle caret>
                                    {this.state.payment_label||"Payment Type"}
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem name="NYS Tax" value="nysTax" onClick={this.setTarget}>
                                        NYS Tax
                                    </DropdownItem>
                                    <DropdownItem name="CA Tax" value="caTax" onClick={this.setTarget}>
                                        CA Tax
                                    </DropdownItem>

                                </DropdownMenu>
                                
                            </ButtonDropdown></div>
                            <div>Remaining Balances:  {this.state.payment_type?`$${this.props.order[this.state.payment_type]}`:"Select a payment type to continue"}</div>
                            <Input type="number" onChange={this.setPaymentAmount} placeholder="Payment Amount"></Input>
                            <Input type="textarea" onChange={this.setNote} placeholder="Optional Notes"></Input>
                            <Button color="primary" >Save Payment</Button>
                            </FormGroup>
                        </Form>
					</ModalBody>
					<ModalFooter>Required Fields Are Red Followed By '*'</ModalFooter>
				</Modal>
			</div>
		);
	}
}
NewPaymentModal.propTypes = {
	addItem: PropTypes.func.isRequired,
	item: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    item: state.item,
    keys:state.keys,
    users: state.users,
	payments:state.payments,
	auth:state.auth
});

export default connect(
	mapStateToProps,
	{ addItem, getItems,getDBKeys ,addPayment,editItem}
)(NewPaymentModal);
