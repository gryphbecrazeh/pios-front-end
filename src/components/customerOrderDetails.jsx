import React, { Component } from "react";
import { Button } from "reactstrap";
// ----------------------------Components-------------------------------------------
import EditModal from "./editModal";
import PaymentModal from "./paymentModal";
// ----------------------------Redux-------------------------------------------
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteItem } from "../actions/itemActions";

class OrderDetails extends Component {
	onDeleteClick = _id => {
		this.props.deleteItem(_id);
	};
	renderKey = (order, key) => {
		if (key === "date") {
			return new Date(order[key]).toDateString();
		}
		switch (key) {
			default:
				return order[key];
		}
	};
	render() {
		let { custOrder, orderKeys } = this.props;
		return (
			<tr key={custOrder._id}>
				<td>
					<PaymentModal order={this.props.custOrder} />
					<EditModal order={this.props.custOrder} />
					<Button
						color="danger"
						onClick={this.onDeleteClick.bind(this, this.props.custOrder._id)}
					/>
				</td>
				{orderKeys.map(key => {
					return <td>{this.renderKey(custOrder, key)}</td>;
				})}
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
