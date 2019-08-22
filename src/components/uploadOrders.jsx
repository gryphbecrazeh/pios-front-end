import React, { Component } from "react";
import {
	Button,
	Input,
	Form,
	FormGroup,
	Container,
	Row,
	Col,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Table
} from "reactstrap";
import CSVDropDown from "./CSVDropDown";
import * as Papa from "papaparse";
import { connect } from "react-redux";
import { getKeys, addKey, addItem, editItem } from "../actions/itemActions";
import PropTypes from "prop-types";
class UploadOrders extends Component {
	state = {
		csv: false,
		results: []
	};
	toggle = () => {
		this.setState({
			csv: !this.state.csv,
			results: []
		});
		this.props.keys.keys = [];
		this.props.keys.dbKeys = [];
	};
	onSubmit = () => {
		let csvFile = document.querySelector("input[type=file]").files[0];
		let res = [];
		// Parses CSV
		Papa.parse(csvFile, {
			header: true,
			// step function, called after every row on the csv
			// pushes retrieved data to res array
			step: row => {
				res.push(row.data);
			},
			complete: () => {
				// Stores results of parsing CSV to state
				this.mapToState(res);
			}
		});
	};
	// Assigns item to the state
	// item is from the on submit
	// keys are stored for generating table headers
	mapToState = item => {
		Object.keys(item[0]).forEach(key => {
			this.props.addKey(key);
		});
		this.setState({
			results: item
		});
	};
	// Upload CSV to DB
	uploadCSV = e => {
		// Initialize Redux Store objects
		let { keys, dbKeys, dbKeysList } = this.props.keys;
		// Convert results with CSV Headings to DB Headings
		let newResults = this.state.results.map(result => {
			// Initialize order object
			let order = {};
			keys.forEach((key, index) => {
				order[dbKeys[index]] = result[key];
			});
			return order;
		});
		// Remove Non-DB Headers
		newResults.forEach(result => {
			let keys = Object.keys(result);
			keys.forEach(key => {
				if (!dbKeysList.some(item => item.value === key)) {
					delete result[key];
				}
			});

			// Add to DB
			this.props.item.customerOrders.find(
				item => item.orderNum === result.orderNum
			)
				? this.props.editItem(result)
				: this.props.addItem(result);
		});
		// Clear Queue
		this.toggle();
	};
	render() {
		const { keys } = this.props.keys;
		return (
			<div>
				<Button block color="success" onClick={this.toggle}>
					Upload Orders by CSV
				</Button>
				<Modal isOpen={this.state.csv} toggle={this.toggle} size="xl">
					<ModalHeader toggle={this.toggle}>Upload with CSV</ModalHeader>
					<ModalBody>
						<Form>
							<FormGroup>
								<Container>
									<Row>
										<Col md={{ size: 8 }}>
											<Input type="file" />
										</Col>
										<Col md={{ size: 2 }}>
											<Button
												color="success"
												target="csv"
												onClick={this.onSubmit}
											>
												Upload
											</Button>
										</Col>
									</Row>
									<Row>
										<Col>
											<div style={{ overflow: "auto", maxHeight: "20rem" }}>
												<Table className="">
													<tbody>
														<tr>
															{keys.map((item, index) => {
																return <th key={index}>{item}</th>;
															})}
														</tr>
														<tr>
															{keys.map((item, index) => {
																return (
																	<td key={index}>
																		<CSVDropDown
																			target={item}
																			key={index}
																			index={index}
																		/>
																	</td>
																);
															})}
														</tr>
														{this.state.results.map(item => {
															return (
																<tr>
																	{keys.map(key => {
																		return <td>{item[key]}</td>;
																	})}
																</tr>
															);
														})}
													</tbody>
												</Table>
											</div>
											<Button
												className={
													this.state.results.length >= 1 ? "d-block" : "d-none"
												}
												color="primary"
												block
												onClick={this.uploadCSV}
											>
												Save to Database
											</Button>
										</Col>
									</Row>
								</Container>
							</FormGroup>
						</Form>
					</ModalBody>
					<ModalFooter>Upload orders with CSV, Match to headers</ModalFooter>
				</Modal>
			</div>
		);
	}
}

UploadOrders.propTypes = {
	getKeys: PropTypes.func.isRequired,
	keys: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	item: state.item,
	keys: state.keys
});

export default connect(
	mapStateToProps,
	{ getKeys, addKey, addItem, editItem }
)(UploadOrders);
