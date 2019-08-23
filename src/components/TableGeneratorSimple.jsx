import React, { Component } from "react";
import { Table, Container, Row, Col } from "reactstrap";

class TableGeneratorSimple extends Component {
	state = {};
	render() {
		let { items, keys } = this.props;
		return (
			<div>
				<Container style={{ maxHeight: "40em", overflow: "auto" }}>
					<Row>
						<Col>
							<Table>
								<thead>
									{keys.map(key => (
										<th key={key.value}>{key.label}</th>
									))}
								</thead>

								<tbody>
									{items.map(item => {
										// console.log(item);
										return (
											<tr>
												{keys.map(key => (
													<td>
														{item[key.value]}
														{console.log(item[key.value], item, key)}
													</td>
												))}
											</tr>
										);
									})}
								</tbody>
							</Table>
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}

export default TableGeneratorSimple;
