// ----------------------------React-------------------------------------------
import React, { Component } from "react";
// ----------------------------Reactstrap-------------------------------------------
import {
	ButtonGroup,
	Button,
	Container,
	Row,
	Col,
	Card,
	CardBody,
	CardTitle,
	CardText,
	CardSubtitle
} from "reactstrap";
// ----------------------------Components-------------------------------------------
// ----------------------------Redux-------------------------------------------

class NoteCard extends Component {
	state = {};
	render() {
		let { subject, note, user, creation_date, category, _id } = this.props.note;
		return (
			<div key={_id} className="mb-2">
				<Card>
					<CardBody>
						<CardTitle>
							<Row>
								<Col xs="9">Subject: {subject}</Col>
								<Col>Category: {category}</Col>
							</Row>
						</CardTitle>
						<CardSubtitle>
							by: {user} on {new Date(creation_date).toDateString()}
						</CardSubtitle>
						<CardText>{note}</CardText>
					</CardBody>
				</Card>
			</div>
		);
	}
}

export default NoteCard;
