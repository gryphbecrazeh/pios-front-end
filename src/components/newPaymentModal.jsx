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
    ButtonDropdown
} from "reactstrap";
// ----------------------------Components-------------------------------------------
import UploadOrders from "./uploadOrders";
import OrderSheet from "./OrderSheet";
// ----------------------------Redux-------------------------------------------
import { connect } from "react-redux";
import { addItem, getItems } from "../actions/itemActions";
import PropTypes from "prop-types";
class NewPaymentModal extends Component {
    constructor(props){
		super(props)
		this.state={
			order_id:this.props.order._id,
			order_number:this.props.order.orderNum,
			payment_date:Date.now(),
            user:this.props.auth.user,
            modal:false,
            dropdown:false,
            
		}
	}
	toggle = (target) => {
		this.setState({
			[target]: !this.state[target]
		});
    };
    setTarget=(target)=>{
        this.setState({
            payment_type:target
        })
    }
    setNote=e=>{
        this.setState({
            note:e.target.value
        })
    }
    setPaymentAmount=(e)=>{
        this.setState({
            total_paid:e.target.value
        })
        console.log(this.state)

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
                        <div>User: {this.state.user.name}</div>
                        <div>Order: {this.state.order_number}</div>
                        <div>Remaining Balances: {this.state.remaining_balance}</div>

                        <div><ButtonDropdown  isOpen={this.state.dropdown} toggle={this.toggle.bind(this,"dropdown")}>
                                <DropdownToggle caret>
                                    {this.state.payment_type||"Payment Type"}
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem onClick={this.setTarget.bind(this,"NYS Tax")}>
                                        NYS Tax
                                    </DropdownItem>
                                    <DropdownItem onClick={this.setTarget.bind(this,"CA Tax")}>
                                        CA Tax
                                    </DropdownItem>

                                </DropdownMenu>
                                
                            </ButtonDropdown></div>
                            <Input type="number" onChange={this.setPaymentAmount} placeholder="Payment Amount"></Input>
                            <Input type="textarea" onChange={this.setNote} placeholder="Notes"></Input>
                            <Button color="primary">Save Payment</Button>
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
    users: state.users,
	payments:state.payments,
	auth:state.auth
});

export default connect(
	mapStateToProps,
	{ addItem, getItems }
)(NewPaymentModal);
