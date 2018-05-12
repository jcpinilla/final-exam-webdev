import React, { Component } from "react";

import Route from "./Route.js";

export default class Routes extends Component {
	constructor(props) {
		super(props);
		this.state = {
			routes: null
		};
	}

	componentDidMount() {
		this.update();
	}

	update() {
		let agencyTag = this.props.agency.tag;
		fetch(`//webservices.nextbus.com/service/publicJSONFeed?command=routeList&a=${agencyTag}`)
			.then(data => data.json())
			.then(json => this.handleData(json.route));
	}

	handleData(routesJson) {
		let routes = [];
		for (let routeJson of routesJson) {
			let title = routeJson.title;
			let tag = routeJson.tag;
			let route = {
				title,
				tag
			};
			routes.push(route);
		}
		this.setState({
			routes
		});
	}

	componentDidUpdate(prevProps) {
		if (this.props !== prevProps) {
			this.update();
		}
	}

	render() {
		let routes = this.state.routes;
		let agency = this.props.agency;
		let routesDisplay = <div>No routes</div>;
		if (routes) {
			routesDisplay = routes.map(route => 
				<Route
					key={route.tag}
					route={route}
					handleRouteChange={this.props.handleRouteChange} />
			);
		}
		return (
			<div>
				<h1>Routes for {agency.title}:</h1>
				{routesDisplay}
			</div>
		);
	}
}
