import React, { Component } from "react";
// ----------------------------Components-------------------------------------------
import EditModal from "./editModal";
import PaymentModal from "./paymentModal";
// ----------------------------Fontawesome-------------------------------------------
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/pro-light-svg-icons";
// ----------------------------Reactstrap-------------------------------------------
import { Button, Collapse } from "reactstrap";
// ----------------------------Redux-------------------------------------------
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteItem } from "../actions/itemActions";
import ViewModal from "./ViewModal";

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
					<Button onMouseOver={this.toggleCollapse}>Interact</Button>
					<Collapse isOpen={this.state.collapse}>
						<ViewModal order={this.props.custOrder} />
						<PaymentModal order={this.props.custOrder} />
						<EditModal order={this.props.custOrder} />
						<Button
							color="danger"
							block
							onClick={this.onDeleteClick.bind(this, this.props.custOrder._id)}
						>
							<FontAwesomeIcon icon={faTrashAlt} />
						</Button>
					</Collapse>
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
