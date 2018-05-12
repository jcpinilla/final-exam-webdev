import React, { Component } from "react";

export default class Agency extends Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		let agency = this.props.agency;
		this.props.handleAgencyChange(agency);
	}

	render() {
		let agency = this.props.agency;
		let title = agency.title;
		let tag = agency.tag;
		return (
			<div
				onClick={this.handleClick}>
				<span className="agency-text">
					{title} (tag: {tag})
				</span>
			</div>
		);
	}
}
