import React, { Component } from "react";
import { Row, Col, Card, CardBody, CardHeader, Button } from "reactstrap";
import PageAlert from "../components/PageAlert";
// ----------------------------Redux-------------------------------------------
import { connect } from "react-redux";
import { getAlerts, clearAlerts } from "../actions/alertActions";
import PropTypes from "prop-types";

class AlertsContainer extends Component {
	state = {
		open: false
	};
	minimize = () => {
		this.setState({
			open: !this.state.open
		});
	};
	componentDidMount() {
		// this.props.clearAlerts();
	}
	render() {
		let d = new Date();
		d.setDate(d.getDate() - 3);
		let activeAlerts = this.props.alerts.filter(alert => alert.alert === true);
		return (
			<Card>
				<CardHeader style={{ position: "relative" }}>
					<Button
						color={
							activeAlerts.some(alert =>
								alert.array.some(item => {
									return (
										new Date(item.date) < new Date(d) &&
										(new Date(item.lastUpdated) < d ||
											item.lastUpdated === "Order has never been editted")
									);
								})
							)
								? "danger"
								: "secondary"
						}
						outline
						block
						onClick={this.minimize}
					>
						{`${activeAlerts.length}
                        Alerts:`}
					</Button>
				</CardHeader>
				{!this.props.alerts.length > 0 ? null : (
					<CardBody
						style={{
							position: "absolute",
							display: this.props.alerts.length > 0 ? "block" : "none",
							zIndex: "300",
							backgroundColor: "white",
							width: "100%",
							marginTop: "4.5em",
							borderRadius: "5px",
							boxShadow: "0 0 2px #555"
						}}
						id="alert-tray"
						className={this.state.open ? "open" : ""}
					>
						<div className="alert-container">
							{this.props.alerts
								.filter(alert => alert.alert === true)
								.map(alert => (
									<PageAlert alert={alert} />
								))}
						</div>
					</CardBody>
				)}
			</Card>
		);
	}
}

const mapStateToProps = state => ({
	alerts: state.alerts.alerts
});

export default connect(
	mapStateToProps,
	{ getAlerts, clearAlerts }
)(AlertsContainer);
