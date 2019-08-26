import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
// ----------------------------Components-------------------------------------------
import UploadProducts from "../components/UploadProducts";
import TableGeneratorSimple from "../components/TableGeneratorSimple";
// ----------------------------Redux-------------------------------------------
import { connect } from "react-redux";
import PropTypes from "prop-types";
class ProductPage extends Component {
	state = {};
	render() {
		return (
			<div>
				<Container>
					<Row>
						<Col>Product Manager Page</Col>
					</Row>
					<Row>
						<Col>Total Products: {this.props.products.length}</Col>
					</Row>
					<Row className="mb-3">
						<Col>
							<UploadProducts />
						</Col>
					</Row>
					<Row>
						<Col>
							<TableGeneratorSimple
								keys={[
									...this.props.keys.filter(key => key.collection === "product")
								]}
								items={
									this.props.products.length > 0
										? this.props.products.slice(0, 50)
										: []
								}
							/>
							{/* Add pagination to table generator, let pageArray[i]=array=array.splice(0,50) shrink the results while applying them to pages */}
							{/* Add search and warning fields */}
							{/* warn if sales are down on items, item hasn't sold in x amount of months */}
							{/* warm if item has been disabled for too long without any changes, does not count permanently removed items */}
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	keys: state.keys.dbKeysList,
	products: state.products.products
});

export default connect(
	mapStateToProps,
	null
)(ProductPage);
