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
		this.height = 600;
		this.width = 800;
		d3.select(".time-chart").select("svg").remove();
		let svg = d3.select(".time-chart").append("svg")
			.attr("width", this.width)
			.attr("height", this.height);
		this.margin = ({top: 20, right: 30, bottom: 30, left: 150});
		//let svg = d3.select(this.svg);
		let buses = [];
		for (let bus of selectedRoute.tr) {
			let route = bus.stop.filter(d => d.epochTime !== "-1");
			route.forEach(d => d.date = new Date(+d.epochTime));
			buses.push(route);
		}
		const minDate = d3.min(buses[1], d => d.date);
		const maxDate = new Date(minDate.getTime() + 22*60*60*1000); // minDate + 24 hours
		const x = d3.scaleTime()
			.domain([ minDate, maxDate ])
			.range([this.margin.left, this.width - this.margin.right]);
		const y = d3.scaleBand()
			.domain(d3.range(buses[1].length))
			.rangeRound([this.height - this.margin.bottom, this.margin.top]);


		const xAxis = g => g
			.attr("transform", `translate(0,${this.height - this.margin.bottom})`)
			.call(d3.axisBottom(x));
		// .call(g => g.select(".domain").remove());
		const yAxis = g => g
			.attr("transform", `translate(${this.margin.left},0)`)
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

		d3.select(".plot").select("svg").remove();
		svg = d3.select(".plot").append("svg")
			.attr("width", this.width)
			.attr("height", this.height);

		let plot = [];
		for (let i = 0; i < selectedRoute.tr.length; i++) {
			let bus = selectedRoute.tr[i];
			for (let j = 0; j < bus.stop.length; i++) {
				let stop = bus.stop[j];
				let epochTime = +stop.epochTime;
				plot[i][j] = epochTime;
			}
		}

		let padding = 30;
		let xScale = d3.scaleLinear()
			.domain([0, d3.max(plot, function(d) { return d[0]; })])
			.range([padding, this.width - padding * 2]);

		let yScale = d3.scaleLinear()
			.domain([0, d3.max(plot, function(d) { return d[1]; })])
			.range([this.height - padding, padding]);

			var xAxis1 = d3.svg.axis()
							  .scale(xScale)
							  .orient("bottom")
							  .ticks(5);

			
			var yAxis1 = d3.svg.axis()
							  .scale(yScale)
							  .orient("left")
							  .ticks(5);
		
			svg = d3.select(".plot")
						.append("svg")
						.attr("width", this.width)
						.attr("height", this.height);

			svg.selectAll("circle")
			   .data(plot)
			   .enter()
			   .append("circle")
			   .attr("cx", function(d) {
			   		return xScale(d[0]);
			   })
			   .attr("cy", function(d) {
			   		return yScale(d[1]);
			   });
			
			svg.append("g")
				.attr("class", "axis")
				.attr("transform", "translate(0," + (this.height - padding) + ")")
				.call(xAxis1);
			
			svg.append("g")
				.attr("class", "axis")
				.attr("transform", "translate(" + padding + ",0)")
				.call(yAxis1);
	}

	render() {
		let route = this.props.route;
		return (
			<div>
				<div className="time-chart">
					<h2>TimeTable for route {route.title}</h2>
					<svg ref={svg => this.svg = svg}></svg>
				</div>
				<div className="plot"></div>
			</div>
		);
	}
}