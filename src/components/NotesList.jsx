// ----------------------------React-------------------------------------------
import React, { Component } from "react";
// ----------------------------Reactstrap-------------------------------------------
import {
	Modal,
	ModalBody,
	ModalHeader,
	ModalFooter,
	Button,
	Container,
	Row,
	Col
} from "reactstrap";
// ----------------------------Components-------------------------------------------
import AddNoteModal from "./AddNoteModal";
import NoteCard from "./NoteCard";
// ----------------------------Redux-------------------------------------------
import { connect } from "react-redux";
import PropTypes from "prop-types";

class NotesList extends Component {
	state = {};
	renderNotes = () => {
		return this.props.notes.map(note => <NoteCard note={note} />);
	};
	render() {
		return (
			<div>
				<Container style={{ maxHeight: "30rem", overflow: "auto" }}>
					<Row>
						<Col className="mt-2">
							{!this.props.notes.length > 0
								? "No notes have been created for this order"
								: this.renderNotes()}
						</Col>
					</Row>
				</Container>
				<AddNoteModal order={this.props.order} />
			</div>
		);
	}
}

NotesList.propTypes = {
	notes: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
	notes: state.notes.notes
});

export default connect(
	mapStateToProps,
	null
)(NotesList);
