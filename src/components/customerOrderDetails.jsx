import React, { Component } from "react";
import { Button } from "reactstrap";
// ----------------------------Components-------------------------------------------
import EditModal from "./editModal";
// ----------------------------Redux-------------------------------------------
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteItem } from "../actions/itemActions";

class OrderDetails extends Component {
	onDeleteClick = _id => {
		this.props.deleteItem(_id);
	};
	render() {
		let { order, display } = this.props;
		let displayTax = [
			"date",
			"orderNum",
			"total",
			"name",
			"custDue",
			"custPaid",
			"netDue",
			"netPaid",
			"netPaidDate",
			"net",
			"netCrate",
			"netFreight",
			"sentTo",
			"rcvd",
			"ship",
			"shipped",
			"custPaidDate",
			"nysTaxPaid",
			"caTaxPaid",
			"nysTax",
			"caTax",
			"st"
		];
		return (
			<tr>
				<td>
					<EditModal order={this.props.order} />
					<Button
						color="danger"
						onClick={this.onDeleteClick.bind(this, this.props.order._id)}
					/>
				</td>
				<td name="Order Date" type="date" code="order-date">{`${new Date(
					order.date
				).toDateString() || ""}`}</td>
				<td
					name="Order Number"
					type="integer"
					code="order-number"
				>{`${order.orderNum || ""}`}</td>
				<td
					name="Customer Name"
					type="string"
					code="customer-name"
				>{`${order.name || "N/A"}`}</td>
				<td name="Recipient State" type="state" code="order-st">{`${order.ST ||
					"N/A"}`}</td>
				<td
					name="Manufacturer Name"
					type="string"
					code="order-mfr"
				>{`${order.mfr || "N/A"}`}</td>
				<td
					name="Order Sent To"
					type="string"
					code="order-sent-to"
				>{`${order.sentTo || "N/A"}`}</td>
				<td
					name="Customer Owes"
					type="integer"
					code="customer-due"
				>{`$${order.custDue || "N/A"}`}</td>
				<td
					name="Customer Paid in Full Date"
					type="date"
					code="customer-paid-date"
				>{`${order.custPaidDate || "N/A"}`}</td>
				<td
					name="KA Net Due"
					type="integer"
					code="ka-net-due"
				>{`$${order.netDue || "N/A"}`}</td>
				<td
					name="KA Net Paid Date"
					type="string"
					code="ka-net-paid-date"
				>{`${order.netPaidDate || "N/A"}`}</td>
				<td code="order-disclaim">{`${order.disclaim || "N/A"}`}</td>
				<td code="order-addr-check">{`${order.addrCheck || "N/A"}`}</td>
				<td code="order-rcvd">{`${order.rcvd || "N/A"}`}</td>
				<td code="order-ship">{`${order.ship || "N/A"}`}</td>
				<td code="order-shipped">{`${order.shipped || "N/A"}`}</td>
				<td code="order-total">{`$${order.total || "N/A"}`}</td>
				<td code="order-ny-tax">{`$${order.nysTax || "N/A"}`}</td>
				<td code="order-ca-tax">{`$${order.caTax || "N/A"}`}</td>
				<td code="order-net">{`${order.net || "N/A"}`}</td>
				<td code="order-net-crate">{`${order.netCrate || "N/A"}`}</td>
				<td code="order-net-freight">{`${order.netFreight || "N/A"}`}</td>
				<td code="order-notes">{`${order.notes || "N/A"}`}</td>
			</tr>
		);
	}
}

OrderDetails.propTypes = {
	deleteItem: PropTypes.func.isRequired,
	item: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	item: state.item
});

export default connect(
	mapStateToProps,
	{ deleteItem }
)(OrderDetails);
