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
		console.log(this.props.products);
		return (
			<div>
				<Container>
					<Row>
						<Col>Product Manager Page</Col>
					</Row>
					<Row className="mb-3">
						<Col>
							<UploadProducts />
						</Col>
					</Row>
					<Row>
						<Col>
							<TableGeneratorSimple
								keys={this.props.keys.filter(
									key => key.collection === "product"
								)}
								items={
									this.props.products.length > 0 ? this.props.products : []
								}
							/>
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
