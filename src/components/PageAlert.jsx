import React, { Component, Fragment } from "react";
import { Row, Col, Button, Alert } from "reactstrap";
// ----------------------------Components-------------------------------------------
import AlertViewModal from "./AlertViewModal";
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
			<Alert
				className="mb-2 mr-2"
				color={
					array.some(item => {
						return new Date(item.lastUpdated) > d || false;
					}) === false
						? "danger"
						: "warning"
				}
			>
				<Row>
					<Col className="" xs="9">
						{array.length} {array.length > 1 ? "orders " : "order "}
						{key.alert}
					</Col>
					<Col>
						<AlertViewModal alert={this.props.alert} />
					</Col>
				</Row>
			</Alert>
		);
	}
}

export default PageAlert;
