import React, { Component } from "react";

import Agencies from "./Agencies.js";
import Routes from "./Routes.js";
import TimeChart from "./TimeChart.js";
import CommentsComp from "./CommentsComp.js";
import CommentsHistory from "./CommentsHistory.js";
import AccountsUIWrapper from "./AccountsUIWrapper.js";

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			agency: {
				title: "SF Muni",
				tag: "sf-muni"
			},
			route: {
				title: "N-Judah",
				tag: "N"
			}
		};
		this.handleAgencyChange = this.handleAgencyChange.bind(this);
		this.handleRouteChange = this.handleRouteChange.bind(this);
		this.handleCommentClick = this.handleCommentClick.bind(this);
	}

	handleAgencyChange(agency) {
		fetch(`http://webservices.nextbus.com/service/publicJSONFeed?command=routeList&a=${agency.tag}`)
			.then(data => data.json())
			.then(json => {
				let firstRouteInAgency = json.route[0];
				this.setState({
					agency,
					route: firstRouteInAgency
				});
			});
	}

	handleRouteChange(route) {
		this.setState({
			route
		});
	}

	handleCommentClick(agency, route) {
		this.setState({
			agency,
			route
		});
	}

	render() {
		let agency = this.state.agency;
		let route = this.state.route;
		return (
			<div className="app container-fluid">
				<AccountsUIWrapper />
				<div className="row">
					<div className="col-lg-4">
						<Agencies
							handleAgencyChange={this.handleAgencyChange} />
					</div>
					<div className="col-lg-4">
						<Routes
							agency={agency}
							handleRouteChange={this.handleRouteChange} />
					</div>
					<div className="col-lg-4">
						<CommentsHistory 
							handleCommentClick={this.handleCommentClick}/>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-8">
						<TimeChart 
							agency={agency}
							route={route} />
					</div>
					<div className="col-lg-4">
						<CommentsComp
							agency={agency}
							route={route} />
					</div>
				</div>
			</div>
		);
	}
}
