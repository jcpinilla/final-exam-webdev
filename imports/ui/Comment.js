import React, { Component } from "react";

export default class Comment extends Component {
	render() {
		let comment = this.props.comment;
		let author = comment.author;
		let text = comment.text;
		return (
			<div>
				<strong>{author}</strong> said "{text}"
			</div>
		);
	}
}
