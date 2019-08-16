import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    Alert,
    Input,
    Container,
    Row,
    Col
} from "reactstrap";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// ----------------------------Redux-------------------------------------------
import { connect } from "react-redux";
import { addItem, getItems,editItem } from "../actions/itemActions";
import PropTypes from "prop-types";



class OrderSheet extends Component {
    constructor(props){
        super(props)
        let {order,mode}=this.props
        let mountOrderProp = {
            _id: order ? order._id : null,
            required: ["name", "date", "orderNum"],
            name: order?order.name:"",
            orderNum: order ?order.orderNum : "",
            date: order ?new Date(order.date) : new Date(),
            st: order ?order.st : "",
            mfr: order ?order.mfr : "",
            sentTo: order ?order.sentTo : "",
            custDue: order ?order.custDue : "",
            custPaidDate: order ?order.custPaidDate : "",
            netDue: order ?order.netDue : "",
            netPaidDate: order ?order.netPaidDate : "",
            disclaim: order ?order.disclaim :"",
            addrCheck: order ?order.addrCheck : "",
            rcvd: order ?order.rcvd : "",
            ship: order ?order.ship  :"",
            shipped: order ?order.shipped : "",
            total: order ?order.total : "",
            nysTax: order ?order.nysTax : "",
            caTax: order ?order.caTax : "",
            net: order ?order.net :"",
            netCrate: order ?order.netCrate : "",
            netFreigt: order ? order.netFreigt :"",
            notes: order ?order.notes : "",
            lastUpdated:order?order.lastUpdated:"Item has not been editted",
            msg: null,
            mode:mode?mode:"view",
        }

        this.state=mountOrderProp
    }
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
        newOrder.lastUpdated=new Date().toString()
        newOrder.custPaidDate=newOrder.custDue===0&&this.props.order.custDue!==0?Date.now():null
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
            this.state.mode === "edit" ?this.props.editItem(newOrder): this.props.addItem(newOrder);
            // Close Modal
        }
    };

    render() { 
        return (<Form onSubmit={this.onSubmit}>
            <FormGroup style={{ overflow: "hidden" }}>
                <Container style={{ maxHeight: "18rem", overflow: "auto" }}>
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
                                value={this.state.orderNum}
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
                            <Label for="order">
                                Customer / Business Bill To Address
											</Label>
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
                            <Label for="order">
                                Customer / Business Ship To Address
											</Label>
                            <Input
                                type="text"
                                name="ship-to-address"
                                id="ship-to-address"
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
                                name="bill-to-state"
                                id="bill-to-state"
                                placeholder="NY"
                                onChange={this.onChange}
                            />
                        </Col>
                        <Col>
                            <Label for="order">Bill To Zip Code</Label>
                            <Input
                                type="text"
                                name="bill-to-zip"
                                id="bill-to-zip"
                                placeholder="10021"
                                onChange={this.onChange}
                            />
                        </Col>
                        <Col>
                            <Label for="order">Ship To State</Label>
                            <Input
                                type="text"
                                name="st"
                                id="ship-to-state"
                                placeholder="NY"
                                value={this.state.st}
                                onChange={this.onChange}
                            />
                        </Col>
                        <Col>
                            <Label for="order">Ship To Zip</Label>
                            <Input
                                type="text"
                                name="ship-to-zip"
                                id="ship-to-zip"
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
                    <Row>
                        <Col>
                            <Label>
                                <strong>Kitchenall Information</strong>
                            </Label>
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
                            <Label>
                                <strong>Kitchenall Shipping</strong>
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
                            <Row>
                                <Col>
                                    <Label for="order">Enter New Sku</Label>
                                    <Input
                                        type="text"
                                        name="newSku"
                                        id="newSku"
                                        placeholder="Sku"
                                        onChange={this.onChange}
                                    />
                                </Col>
                                <Col>
                                    <Label for="order">Enter New Sku Manufacturer</Label>
                                    <Input
                                        type="text"
                                        name="mfr"
                                        id="mfr"
                                        placeholder="Manufacturer"
                                        onChange={this.onChange}
                                    />
                                </Col>

                                <Col>
                                    <Button>Add Item</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Label for="order">Order Sent To</Label>
                            <Input
                                type="text"
                                name="sent-to"
                                id="sent-to"
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
                    <Row>
                        <Col>
                            <Label for="order">Ship Date</Label>
                            <Datepicker
                                dateFormat="MM/dd/yyyy"
                                selected={this.state.shipped}
                                onChange={this.onChangeDate}
                                name="shipped"
                                id="shipped"
                            />
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <Row>
                        <Col>
                            <Label for="order">Notes</Label>
                            <Input
                                style={{ minHeight: "10em" }}
                                type="textarea"
                                name="ship"
                                id="ship"
                                placeholder="Kitchenall Notes"
                                onChange={this.onChange}
                            />
                        </Col>
                    </Row>
                </Container>
                <Button color="primary" style={{ marginTop: "2rem" }} block>
                    Save
								</Button>
            </FormGroup>
        </Form> );
    }
}
 
OrderSheet.propTypes = {
    addItem: PropTypes.func.isRequired,
    editItem: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    item: state.item
});

export default connect(
    mapStateToProps,
    { addItem, getItems,editItem }
)(OrderSheet);
