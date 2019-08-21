import React, { Component, Fragment } from "react";
import {
	Label,
	Container,
	Row,
	Input,
	Col,
	Dropdown,
	DropdownItem,
	Button,
	DropdownMenu,
	DropdownToggle,
	Card,
	CardBody,
	CardSubtitle,
	CardTitle,
	CardText
} from "reactstrap";
// ----------------------------Components-------------------------------------------
import OrderModal from "../components/OrderModal";
import TableGenerator from "../components/TableGenerator";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Filters from "../components/Filters";
// ----------------------------Redux-------------------------------------------
import { connect } from "react-redux";
import { getFilters, addFilter } from "../actions/filterActions";
import PropTypes from "prop-types";

class PageAlert extends Component {
	state = {};
	render() {
		console.log(this.props.alert);
		let { key, array } = this.props.alert;
		return (
			<Card className="mb-2 mr-2">
				<CardBody>
					<Container>
						<Row>
							<Col xs="10">
								{array.length} {array.length > 1 ? "orders " : "order "}
								{key.alert}
							</Col>
							<Col>
								<Button color="danger">View Now</Button>
							</Col>
						</Row>
					</Container>
				</CardBody>
			</Card>
		);
	}
}

export default PageAlert;
