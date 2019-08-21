import React, { Component, Fragment } from "react";
import { Container, Row, Col, Button, Card, CardBody } from "reactstrap";
// ----------------------------Components-------------------------------------------
import OrderModal from "../components/OrderModal";
import TableGenerator from "../components/TableGenerator";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Filters from "../components/Filters";
// ----------------------------Redux-------------------------------------------
import { connect } from "react-redux";
import PropTypes from "prop-types";

class PageAlert extends Component {
	state = {};
	render() {
		let d = new Date();
		d.setDate(d.getDate() - 3);
		let { key, array } = this.props.alert;
		return (
			<Card
				className="mb-2 mr-2"
				color={
					array.some(item => new Date(item.lastUpdated) > d) != []
						? "Danger"
						: ""
				}
			>
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
