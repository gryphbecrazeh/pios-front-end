// ----------------------------React-------------------------------------------
import React, { Component } from "react";
import { Table } from "reactstrap";
// ----------------------------Components-------------------------------------------
import OrderDetails from "./customerOrderDetails";
import uuid from "uuid";
// ----------------------------Redux-------------------------------------------
import { connect } from "react-redux";
import { getDBKeys } from "../actions/itemActions";
import PropTypes from "prop-types";
class TableGenerator extends Component {
	state = {};
	render() {
		let { orders, keys, pageKeys } = this.props;
		let { dbKeysList } = keys;
		return (
			<Table>
				<thead>
					<tr className="text-center text-nowrap">
						<th>Edit</th>
						{pageKeys.map((key, index) => {
							let targetKey = dbKeysList.find(item => item.value === key);
							return (
								<th key={uuid()}>
									{targetKey
										? targetKey.label
										: "This wasn't supposed to happen"}
								</th>
							);
						})}
					</tr>
				</thead>
				<tbody id="table-result-container">
					{orders.map(item => {
						return <OrderDetails custOrder={item} orderKeys={pageKeys} />;
					})}
				</tbody>
			</Table>
		);
	}
}

TableGenerator.propTypes = {
	getKeys: PropTypes.func.isRequired,
	keys: PropTypes.object.isRequired,
	dbKeysList: PropTypes.object
};

const mapStateToProps = state => ({
	keys: state.keys,
	dbKeysList: state.dbKeysList
});

export default connect(
	mapStateToProps,
	{ getDBKeys }
)(TableGenerator);
