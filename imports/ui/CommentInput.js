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
		let agencyTag = this.props.agencyTag;
		let routeTag = this.props.routeTag;
		Meteor.call("comments.insert", agencyTag, routeTag, commentInput, () => {
			this.setState({
				commentInput: ""
			});
		});
	}

	render() {
		let commentInput = this.state.commentInput;
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
