import React, { Component } from "react";

import Agency from "./Agency.js";

export default class Agencies extends Component {
	constructor(props) {
		super(props);
		this.state = {
			agencies: null
		};
	}

	componentDidMount() {
		this.update();
	}

	update() {
		fetch("http://webservices.nextbus.com/service/publicJSONFeed?command=agencyList")
			.then(data => data.json())
			.then(json => this.handleData(json.agency));
	}

	handleData(agenciesJson) {
		let agencies = [];
		for (let agencyJson of agenciesJson) {
			let title = agencyJson.title;
			if (agencyJson.shortTitle) {
				title = agencyJson.shortTitle;
			}
			let tag = agencyJson.tag;
			let agency = {
				title,
				tag
			};
			agencies.push(agency);
		}
		this.setState({
			agencies
		});
	}

	render() {
		let agencies = this.state.agencies;
		let agenciesDisplay = <div>No agencies</div>;
		if (agencies) {
			agenciesDisplay = agencies.map(agency =>
				<Agency
					key={agency.tag}
					agency={agency}
					handleAgencyChange={this.props.handleAgencyChange} />
			);
		}
		return (
			<div>
				<h1>Agencies:</h1>
				{agenciesDisplay}
			</div>
		);
	}
}
