import React, { Component } from "react";
import { Meteor } from "meteor/meteor";

export default class CommentInput extends Component {
	constructor(props) {
		super(props);
		this.state = {
			commentInput: ""
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		let commentInput = event.target.value;
		this.setState({
			commentInput
		});
	}

	handleSubmit(event) {
		event.preventDefault();
		let commentInput = this.state.commentInput;
		if (commentInput === "") return;
		let agency = this.props.agency;
		let route = this.props.route;
		Meteor.call("comments.insert", agency, route, commentInput, () => {
			this.setState({
				commentInput: ""
			});
		});
	}

	render() {
		let commentInput = this.state.commentInput;
		if (!Meteor.userId()) {
			return <div><em>Only logged in users can comment.</em></div>;
		}
		return (
			<form onSubmit={this.handleSubmit}>
				<label>
					Add a comment:{" "}
					<input
						type="text"
						value={commentInput}
						onChange={this.handleChange} />
				</label>
			</form>
		);
	}
}
