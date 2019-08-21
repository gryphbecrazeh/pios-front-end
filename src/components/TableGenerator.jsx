// ----------------------------React-------------------------------------------
import React, { Component } from "react";
import { Table } from "reactstrap";
// ----------------------------Components-------------------------------------------
import OrderDetails from "./customerOrderDetails";
import uuid from "uuid";
// ----------------------------Redux-------------------------------------------
import { connect } from "react-redux";
import PropTypes from "prop-types";

class TableGenerator extends Component {
	filterTable = filter => {
		switch (filter) {
			case "financial":
				return ["nysTaxPaidDate", "caTaxPaidDate"];
			default:
				return [];
		}
	};
	filterDate = array => {
		let range1 = this.props.filters.sortStart;
		let range2 = this.props.filters.sortEnd;
		let arrangeDates = range2 > range1;
		let start = arrangeDates === true ? range1 : range2;
		let end = arrangeDates === true ? range2 : range1;
		// Determine if show all is active, if it is, return the unfiltered result
		let result = !this.props.filters.showAll
			? array.filter(
					item => new Date(item.date) >= start && new Date(item.date) <= end
			  )
			: array;
		return result;
	};
	filterQuery = array => {
		let result = array.filter(
			item =>
				item.name.match(new RegExp(this.props.filters.searchQuery), "gmi") ||
				item.orderNum.match(new RegExp(this.props.filters.searchQuery), "gmi")
		);
		return this.props.filters.searchQuery !== null || "" ? result : array;
	};
	render() {
		let { keys, pageKeys } = this.props;
		let { dbKeysList } = keys;
		let orders = this.props.item.customerOrders;
		return (
			<Table className="mt-3">
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
					{this.filterTable(this.props.filter).forEach(filter => {
						orders = orders.filter(item => !item[filter]);
					})}
					{this.filterQuery(this.filterDate(orders)).map(item => {
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
	dbKeysList: state.dbKeysList,
	filters: state.filters,
	item: state.item
});

export default connect(
	mapStateToProps,
	null
)(TableGenerator);
