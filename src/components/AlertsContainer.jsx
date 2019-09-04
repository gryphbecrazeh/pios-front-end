import React, { Component } from "react";
import { Row, Col, Card, CardBody, CardHeader, Button } from "reactstrap";
import PageAlert from "../components/PageAlert";

class AlertsContainer extends Component {
	state = {
		open: true
	};
	minimize = () => {
		this.setState({
			open: !this.state.open
		});
	};
	render() {
		return (
			<Card>
				<CardHeader style={{ position: "relative" }}>
					<Button outline block onClick={this.minimize}>
						{`${this.props.alerts.filter(alert => alert.alert === true).length}
                        Alerts:`}
					</Button>
				</CardHeader>
				{!this.state.open && this.props.alerts.length > 0 ? null : (
					<CardBody>
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

export default AlertsContainer;
