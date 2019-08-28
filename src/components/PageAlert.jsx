import React, { Component } from "react";
import { Row, Col, Alert } from "reactstrap";
// ----------------------------Components-------------------------------------------
import AlertViewModal from "./AlertViewModal";
// ----------------------------Redux-------------------------------------------

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
					array.find(item => {
						return (
							new Date(item.date) < new Date(d) &&
							(new Date(item.lastUpdated) < d ||
								item.lastUpdated === "Order has never been editted")
						);
					}) !== undefined
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
