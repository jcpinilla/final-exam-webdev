import React, { Component } from "react";
import * as d3 from "d3";

export default class Graph extends Component {
	componentDidMount() {
		let buses = this.props.buses;
		let selectedRoute = this.props.selectedRoute;
		const width = 600;
		const height = 600;
	  const svg = d3.select("#graph");
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
		return (
			<div>
				<svg
					id="graph"
					width="600"
					height="600"
					ref={svg => this.svg = svg}
				></svg>
			</div>
		);
	}
}
