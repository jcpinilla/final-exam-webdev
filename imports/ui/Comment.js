import React, { Component } from "react";

export default class Comment extends Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		let comment = this.props.comment;
		let agency = comment.agency;
		let route = comment.route;
		this.props.handleCommentClick(agency, route);
	}

	render() {
		let comment = this.props.comment;
		let author = comment.author;
		let text = comment.text;
		return (
			<div
				className="comment"
				onClick={this.handleClick}>
				<strong>{author}</strong> said "{text}"
			</div>
		);
	}
}
