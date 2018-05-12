import React, { Component } from "react";
import * as d3 from "d3";

export default class TimeChart extends Component {
	componentDidMount() {
		let agencyTag = this.props.agency.tag;
		let routeTag = this.props.route.tag;
		this.update(agencyTag, routeTag);
	}

	update(agencyTag, routeTag) {
		console.log("agencyTag:" + agencyTag);
		console.log("routeTag:" + routeTag);
		fetch(`http://webservices.nextbus.com/service/publicJSONFeed?command=schedule&a=${agencyTag}&r=${routeTag}`)
			.then(data => data.json())
			.then(json => this.handleData(json.route[0]));
	}

	componentWillReceiveProps(nextProps) {
		if (this.props !== nextProps) {
			let agencyTag = nextProps.agency.tag;
			let routeTag = nextProps.route.tag;
			this.update(agencyTag, routeTag);
		}
	}

	handleData(selectedRoute) {
		let buses = [];
		for (let bus of selectedRoute.tr) {
			let route = bus.stop.filter(d => d.epochTime !== "-1");
			route.forEach(d => d.date = new Date(+d.epochTime));
			buses.push(route);
		}
		const height = 600;
		const width = 800;
		const svg = d3.select(this.svg)
			.attr("width", width)
			.attr("height", height);
		const margin = ({top: 20, right: 30, bottom: 30, left: 150});
		const minDate = d3.min(buses[1], d => d.date);
		const maxDate = new Date(minDate.getTime() + 22*60*60*1000); // minDate + 24 hours
		const x = d3.scaleTime()
			.domain([ minDate, maxDate ])
			.range([margin.left, width - margin.right]);
		const y = d3.scaleBand()
			.domain(d3.range(buses[1].length))
			.rangeRound([height - margin.bottom, margin.top]);


		const xAxis = g => g
			.attr("transform", `translate(0,${height - margin.bottom})`)
			.call(d3.axisBottom(x));
		// .call(g => g.select(".domain").remove());
		const yAxis = g => g
			.attr("transform", `translate(${margin.left},0)`)
			.call(d3.axisLeft(y)
				.tickFormat((d) => selectedRoute.header.stop[d].content));  

		const line = d3.line()
			.x(d => x(d.date))
			.y((d,i) => y(i) + y.bandwidth()/2);

		svg.append("g")
			.call(xAxis);

		svg.append("g")
			.call(yAxis);

		svg.selectAll(".routes")
			.data(buses)
			.enter()
			.append("path")
			.attr("fill", "none")
			.attr("stroke", "steelblue")
			.attr("stroke-width", 2)
			.attr("stroke-linejoin", "round")
			.attr("stroke-linecap", "round")
			.attr("d", line);
	}

	render() {
		let route = this.props.route;
		return (
			<div className="time-chart">
				<h2>TimeTable for route {route.title}</h2>
				<svg ref={svg => this.svg = svg}></svg>
			</div>
		);
	}
}