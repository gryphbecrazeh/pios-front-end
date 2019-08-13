import React, { Component } from "react";
import * as Papa from "papaparse";
class UploadOrders extends Component {
	state = {};
	render() {
		return (
			<div>
				<button
					type="submit"
					target="csv"
					onClick={() => {
						let csvFile = document.querySelector("input[type=file]").files[0];
						Papa.parse(csvFile, {
							complete: function(results) {
								console.log("papa results: ", results);
							}
						});
					}}
				>
					Upload Orders with CSV
				</button>
				<input type="file" />
			</div>
		);
	}
}

export default UploadOrders;
