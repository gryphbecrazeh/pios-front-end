import React, { Component } from "react";
class OrderDetails extends Component {
	state = {};
	render() {
		let { order } = this.props;
		return (
			<tr>
				<td name="Order Date" type="date" code="order-date">{`${order.date ||
					""}`}</td>
				<td
					name="Order Number"
					type="integer"
					code="order-number"
				>{`${order.orderNum || ""}`}</td>
				<td
					name="Customer Name"
					type="string"
					code="customer-name"
				>{`${order.name || ""}`}</td>
				<td name="Recipient State" type="state" code="order-st">{`${order.ST ||
					""}`}</td>
				<td
					name="Manufacturer Name"
					type="string"
					code="order-mfr"
				>{`${order.mfr || ""}`}</td>
				<td
					name="Order Sent To"
					type="string"
					code="order-sent-to"
				>{`${order.sentTo || ""}`}</td>
				<td
					name="Customer Owes"
					type="integer"
					code="customer-due"
				>{`$${order.custDue || ""}`}</td>
				<td
					name="Customer Paid in Full Date"
					type="date"
					code="customer-paid-date"
				>{`${order.custPaidDate || ""}`}</td>
				<td
					name="KA Net Due"
					type="integer"
					code="ka-net-due"
				>{`$${order.netDue || ""}`}</td>
				<td
					name="KA Net Paid Date"
					type="string"
					code="ka-net-paid-date"
				>{`${order.netPaidDate || ""}`}</td>
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

export default OrderDetails;
