import React, { Component } from "react";

export default class Route extends Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		let route = this.props.route;
		this.props.handleRouteChange(route);
	}

	render() {
		let route = this.props.route;
		let title = route.title;
		let tag = route.tag;
		return (
			<div
				onClick={this.handleClick}>
				<span className="route-text">
					{title} (tag: {tag})
				</span>
			</div>
		);
	}
}
