import React, { Component } from "react";
import OrderDetails from "../components/customerOrderDetails";
import UploadOrders from "../components/uploadOrders";
import { connect } from "react-redux";
import { getItems } from "../actions/itemActions";
import PropTypes from "prop-types";
class MasterPage extends Component {
	componentDidMount() {
		this.props.getItems();
	}
	// state = {
	// 	mode: "view"
	// };
	render() {
		const { customerOrders } = this.props.item;
		return (
			<div className="page-container">
				<h1>Master Order Detail Page</h1>
				<UploadOrders />
				<table id="master-customer-details">
					<thead>
						<tr>
							<th code="order-date">Order Date</th>
							<th code="order-number">Order Number</th>
							<th code="customer-name">Customer Name</th>
							<th code="order-st">Recipient State</th>
							<th code="order-mfr">Manufacturer</th>
							<th code="order-sent-to">Sent To</th>
							<th code="customer-due">Customer Owes</th>
							<th code="customer-paid-date">Customer Paid Date</th>
							<th code="ka-net-due">KA Net Due</th>
							<th code="ka-net-paid-date">KA Net Paid Date</th>
							<th code="order-disclaim">DISCLAIM</th>
							<th code="order-addr-check">ADDR CHECK</th>
							<th code="order-rcvd">RCVD</th>
							<th code="order-ship">SHIP</th>
							<th code="order-shipped">SHIPPED</th>
							<th code="order-total">TOTAL</th>
							<th code="order-ny-tax">NYS TAX</th>
							<th code="order-ca-tax">CA TAX</th>
							<th code="order-net">NET</th>
							<th code="order-net-crate">NET CRATE</th>
							<th code="order-net-freight">NET FREIGHT</th>
							<th code="order-notes">NOTES</th>
						</tr>
					</thead>
					<tbody>
						{customerOrders.map(item => {
							return <OrderDetails order={item} />;
						})}
					</tbody>
				</table>
			</div>
		);
	}
}

MasterPage.propTypes = {
	getItems: PropTypes.func.isRequired,
	item: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	item: state.item
});

export default connect(
	mapStateToProps,
	{ getItems }
)(MasterPage);
