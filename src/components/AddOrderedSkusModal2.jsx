// ----------------------------React-------------------------------------------
import React, { Component, Fragment } from "react";
// ----------------------------Reactstrap-------------------------------------------
import {
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Card,
	CardBody,
	Container,
	Row,
	Col,
	Button,
	Input
} from "reactstrap";
// ----------------------------Components-------------------------------------------
// ----------------------------Redux-------------------------------------------
import { connect } from "react-redux";

class AddOrderedSkusModal extends Component {
	state = {
		modal: false
	};
	toggle = () => {
		this.setState({
			modal: !this.state.modal
		});
	};
	changeSearch = e => {
		this.setState({
			query: e.target.value
		});
	};
	clearSearch = () => {
		this.setState({
			selected: null
		});
	};
	selectItem = e => {
		let { products } = this.props;
		this.setState({
			selected: products.find(item => item.sku === e.target.value)
		});
	};
	render() {
		console.log(this.props);
		const { order, products } = this.props;
		let SearchRes = (
			<Fragment>
				{!this.state.query
					? null
					: products
							.filter(
								item =>
									item.sku.match(new RegExp(this.state.query, "gmi")) ||
									item.manufacturerSku.match(
										new RegExp(this.state.query, "gmi")
									)
							)
							.slice(0, 10)
							.map(item => (
								<Row key={item._id} className="mt-1 mb-1">
									<Col>
										<Card>
											<CardBody>
												<Row>
													<Col className="text-nowrap" xs="9">
														{`${item.brand || null} ${item.sku}`}
														{!item.manufacturerSku
															? null
															: ` aka ${item.manufacturerSku}`}
													</Col>
													<Col>
														<Button onClick={this.selectItem} value={item.sku}>
															Select this item
														</Button>
													</Col>
												</Row>
											</CardBody>
										</Card>
									</Col>
								</Row>
							))}
			</Fragment>
		);
		let SkuData = (
			<Fragment>
				<Row>
					<Col>Displaying Product Data</Col>
				</Row>
			</Fragment>
		);
		return (
			<div>
				<Button block color="primary" onClick={this.toggle}>
					Add New Sku to Order
				</Button>
				<Modal isOpen={this.state.modal} toggle={this.toggle} size="xl">
					<ModalHeader
						toggle={this.toggle}
					>{`Adding Product to Order ${order.orderNum}`}</ModalHeader>
					<ModalBody>
						<Container style={{ maxHeight: "30em", overflow: "auto" }}>
							<Row className="mt-3">
								<Col xs="9">
									<Input
										type="text"
										placeholder="Search for a product"
										onChange={this.changeSearch}
									></Input>
								</Col>
								<Col>
									{!this.state.selected ? null : (
										<Button onClick={this.clearSearch} color="warning">
											Change Product
										</Button>
									)}
								</Col>
							</Row>
							{!this.state.selected
								? !this.state.modal
									? null
									: SearchRes
								: SkuData}
						</Container>
					</ModalBody>
				</Modal>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	products: state.products.products
});

export default connect(
	mapStateToProps,
	null
)(AddOrderedSkusModal);
