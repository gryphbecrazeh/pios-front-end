import React, { Component } from "react";
import { Table, Container, Row, Col, Button } from "reactstrap";
import { connect } from "react-redux";
import {
	getProducts,
	addProduct,
	editProduct,
	deleteProduct
} from "../actions/productActions";
class TableGeneratorSimple extends Component {
	state = {};
	deleteProduct = e => {
		e.preventDefault();
		this.props.deleteProduct(e.target.name);
	};
	render() {
		let { items, keys } = this.props;
		return (
			<div>
				<Container style={{ maxHeight: "40em", overflow: "auto" }}>
					<Row>
						<Col>
							<Table>
								<thead>
									<th>Interact</th>
									{keys.map(key => (
										<th key={key.value}>{key.label}</th>
									))}
								</thead>

								<tbody>
									{items.map(item => {
										// console.log(item);
										return (
											<tr>
												<td>
													<Button
														color="danger"
														onClick={this.deleteProduct}
														name={item._id}
														type="button"
													/>
												</td>
												{keys.map(key => (
													<td>{item[key.value]}</td>
												))}
											</tr>
										);
									})}
								</tbody>
							</Table>
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}

const mapStateToProps = state => ({});

export default connect(
	mapStateToProps,
	{ getProducts, addProduct, editProduct, deleteProduct }
)(TableGeneratorSimple);
