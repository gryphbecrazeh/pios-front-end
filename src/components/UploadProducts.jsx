import "babel-polyfill";
import React, { Component, Fragment } from "react";
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
	Table,
	ModalFooter
} from "reactstrap";
import * as Papa from "papaparse";
import { connect } from "react-redux";
import {
	getProducts,
	addProduct,
	editProduct,
	deleteProduct
} from "../actions/productActions";
class UploadProducts extends Component {
	state = {
		csv: false,
		results: [],
		renderResults: false,
		dropdown: {},
		upload: false
	};
	componentDidMount() {
		this.setState({
			keys: this.props.keys.filter(key => key.collection === "product")
		});
	}
	toggle = () => {
		this.setState({
			csv: !this.state.csv,
			results: [],
			renderResults: false
		});
	};
	loadFile = e => {
		this.setState({
			loader: e.target
		});
	};
	renderCsv = () => {
		let csvFile = document.querySelector("input[type=file]").files[0] || null;
		if (csvFile) {
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
					this.setState({ results: res, renderResults: true }, () =>
						console.log(this.state)
					);
				}
			});
		} else alert("Please supply a file");
	};
	actionCsvHeader = () => {
		let res =
			this.state.renderResults === false
				? null
				: (() => {
						let keys = Object.keys(this.state.results[0]);
						return keys.map(key => <th key={key}>{key}</th>);
				  })();
		return (
			<thead>
				<tr>{res}</tr>
			</thead>
		);
	};
	actionCsvBody = () => {
		let res =
			this.state.renderResults === false
				? null
				: (() => {
						return this.state.results.map((sku, index) => (
							<tr key={index}>
								{(() => {
									let keys = Object.keys(sku);
									return keys.map(key => {
										return <td>{String(sku[key])}</td>;
									});
								})()}
							</tr>
						));
				  })();
		return <tbody>{res}</tbody>;
	};
	testSubmit = e => {
		e.preventDefault();
		this.setState({ upload: true });
		let importedCsvs = [...this.state.results];
		let reduceProducts = () => {
			let importLimiter = importedCsvs.splice(0, 20);
			importLimiter.forEach(item => {
				console.log("Actioning ", item.sku);
				// Find, if exists, change, else, upload
				Array.find(this.props.products, x => {
					let keys = Object.keys(item);
					// Remove extra spaces added onto text from CSV
					keys.forEach(key =>
						item[key] ? () => (item[key] = item[key].replace(/\s+$/, "")) : null
					);
					// console.log(x.sku, item.sku, String(x.sku) === String(item.sku));
					return x.sku === item.sku;
				})
					? this.props.editProduct(item, this.props.products)
					: this.props.addProduct(item);
			});
			if (importedCsvs.length > 0)
				setTimeout(() => {
					reduceProducts();
				}, 3000);
			else {
				this.setState({ upload: false });
			}
		};
		setTimeout(() => {
			reduceProducts();
		}, 3000);
		function checkItem() {}
	};
	onSubmit = e => {
		e.preventDefault();
		this.state.results.forEach(item => {
			this.props.products.find(found => found.sku === item.sku) === undefined
				? this.props.addProduct(item)
				: this.props.editProduct(item, this.props.products);
		});
	};
	// Assigns item to the state
	// item is from the on submit
	// keys are stored for generating table headers

	// Upload CSV to DB
	uploadCSV = e => {
		// Clear Queue
		this.toggle();
	};
	render() {
		let Uploading = (
			<Fragment>
				<Container>
					<Row>
						<Col>
							Uploading, please do not close or navigate away from this page
						</Col>
					</Row>
				</Container>
			</Fragment>
		);
		let Upload = (
			<Fragment>
				<Form>
					<FormGroup>
						<Container>
							<Row>
								<Col md={{ size: 8 }}>
									<Input onChange={this.loadFile} type="file" />
								</Col>
								<Col md={{ size: 2 }}>
									<Button
										color="success"
										target="csv"
										onClick={this.renderCsv}
										type="button"
									>
										Upload
									</Button>
								</Col>
							</Row>
							<Row>
								<Col>
									Required keys to save are: 'sku', 'manufacturer',
									'manufacturerSku', 'cost', 'weight'. 'distributer' is optional
								</Col>
							</Row>
							<Container fluid style={{ maxHeight: "30em", overflow: "auto" }}>
								<Row>
									<Col xs="12">
										<Table className="text-center text-nowrap">
											{this.actionCsvHeader()}
											{this.actionCsvBody()}
										</Table>
									</Col>
								</Row>
							</Container>
							<Row>
								<Col>
									<Button
										className={
											this.state.results.length >= 1 ? "d-block" : "d-none"
										}
										color="primary"
										block
										onClick={this.testSubmit}
									>
										Save to Database
									</Button>
								</Col>
							</Row>
						</Container>
					</FormGroup>
				</Form>
			</Fragment>
		);
		return (
			<div>
				<Button color="success" onClick={this.toggle}>
					Upload/Update Products by CSV
				</Button>
				<Modal isOpen={this.state.csv} toggle={this.toggle} size="xl">
					<ModalHeader toggle={this.toggle}>Upload with CSV</ModalHeader>
					<ModalBody>{this.state.upload ? Uploading : Upload}</ModalBody>
					<ModalFooter>Upload Products with CSV, Match to headers</ModalFooter>
				</Modal>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	products: state.products.products,
	keys: state.keys.dbKeysList
});

export default connect(
	mapStateToProps,
	{ getProducts, addProduct, editProduct, deleteProduct }
)(UploadProducts);
