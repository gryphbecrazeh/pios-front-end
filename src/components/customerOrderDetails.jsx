import React, { Component } from "react";
// ----------------------------NPM-------------------------------------------
import uuid from "uuid";
// ----------------------------Components-------------------------------------------
import ViewModal from "./ViewModal";
import EditModal from "./editModal";
import PaymentModal from "./paymentModal";
import DeleteModal from "./DeleteModal";
// ----------------------------Fontawesome-------------------------------------------
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/pro-light-svg-icons";
// ----------------------------Reactstrap-------------------------------------------
import { Button, Collapse } from "reactstrap";
// ----------------------------Redux-------------------------------------------
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteItem } from "../actions/itemActions";

class OrderDetails extends Component {
	state = {
		collapse: false
	};
	onDeleteClick = _id => {
		this.props.deleteItem(_id);
	};
	renderKey = (order, key) => {
		if (key === "date") {
			return new Date(order[key]).toDateString();
		}
		switch (key) {
			case "addrCheck":
				return order[key] === true ? "Checked" : "Not Checked";
			default:
				return order[key];
		}
	};
	toggleCollapse = () => {
		this.setState({ collapse: !this.state.collapse });
		setTimeout(() => {
			this.setState({
				collapse: false
			});
		}, 3000);
	};
	render() {
		let { custOrder, orderKeys } = this.props;
		return (
			<tr key={custOrder._id}>
				<td>
					<Button onClick={this.toggleCollapse}>Interact</Button>
					<Collapse isOpen={this.state.collapse}>
						<ViewModal order={this.props.custOrder} />
						<PaymentModal order={this.props.custOrder} />
						<EditModal order={this.props.custOrder} />
						<DeleteModal order={this.props.custOrder} />
					</Collapse>
				</td>
				{orderKeys.map(key => {
					return <td key={uuid()}>{this.renderKey(custOrder, key)}</td>;
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
