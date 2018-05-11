import React, { Component } from "react";
import Graph from "./Graph.js";

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			buses: null,
			selectedRoute: null
		}
	}

  componentWillMount() {
    fetch("https://gist.githubusercontent.com/john-guerra/6a1716d792a20b029392501a5448479b/raw/e0cf741c90a756adeec848f245ec539e0d0cd629/sfNSchedule")
  		.then(data => data.json())
  		.then(json => this.handleData(json));
  }

  handleData(busSchedule) {
  	let selectedRoute = busSchedule.route[0];
  	let buses = [];
	  for (let bus of selectedRoute.tr) { 
	    let route = bus.stop.filter((d) => d.content!=="--");
	    route.forEach((d) => d.date = new Date(+d.epochTime));    
	    buses.push(route);
	  }
	  this.setState({
	  	buses,
	  	selectedRoute
	  });
  }


  render() {
  	let buses = this.state.buses;
  	let selectedRoute = this.state.selectedRoute;
    return (buses !== null && selectedRoute !== null) ? (
    	<Graph buses={buses} selectedRoute={selectedRoute} />
    ) : (
    	<div></div>
    );
  }
}