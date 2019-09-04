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
		if (array) {
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
		}
		return array;
	};
	filterQuery = array => {
		if (array) {
			let result = array.filter(
				item =>
					item.name.match(new RegExp(this.props.filters.searchQuery, "gmi")) ||
					item.orderNum.match(new RegExp(this.props.filters.searchQuery, "gmi"))
			);
			return this.props.filters.searchQuery !== null || "" ? result : array;
		}
		return array;
	};
	render() {
		// console.log(this.props.filters);
		let { keys, pageKeys, orders } = this.props;
		let { dbKeysList } = keys;
		return (
			<div
				className="table-container"
				style={{ overflow: "auto", maxWidth: "100vw" }}
			>
				<Table className="mt-3">
					<thead>
						<tr className="text-center text-nowrap">
							<th>Interact</th>
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
						{orders.map(item => {
							return <OrderDetails custOrder={item} orderKeys={pageKeys} />;
						})}
					</tbody>
				</Table>
			</div>
		);
	}
}

TableGenerator.propTypes = {
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
