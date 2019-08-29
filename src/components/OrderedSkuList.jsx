// ----------------------------React-------------------------------------------
import React, { Component, Fragment } from "react";
// ----------------------------Reactstrap-------------------------------------------
import { Container, Row, Col } from "reactstrap";
// ----------------------------Components-------------------------------------------
import OrderedSkuCard from "./OrderedSkuCard";
import AddOrderedSkusModal from "./AddOrderedSkusModal2";
// ----------------------------Redux-------------------------------------------
import { connect } from "react-redux";

class OrderedSkuList extends Component {
	state = {};
	renderOrderedSkus = () => {
		let { orderedSkus } = this.props;
		orderedSkus.map(sku => (
			<Row>
				<Col>
					<OrderedSkuCard sku={sku} order={this.props.order} />
				</Col>
			</Row>
		));
	};
	render() {
		return (
			<div>
				<Container style={{ maxHeight: "30rem", overflow: "auto" }}>
					{!this.props.orderedSkus.length > 0 ? (
						<Row>
							<Col className="mt-2">
								No skus have been added to this order...
							</Col>
						</Row>
					) : (
						this.renderOrderedSkus()
					)}
					<Row>
						<Col>
							<AddOrderedSkusModal order={this.props.order} />
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	orderedSkus: state.orderedSkus.orderedSkus
});

export default connect(
	mapStateToProps,
	null
)(OrderedSkuList);
