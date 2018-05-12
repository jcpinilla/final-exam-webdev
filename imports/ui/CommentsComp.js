import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";

import { Comment } from "./Comment.js";

import { Comments } from "../api/comments.js";

class CommentsComp extends Component {
	render() {
		let comments = this.props.comments;
		let commentsDisplay = <div></div>;
		if (comments) {
			commentsDisplay = comments.map(comment =>
				<Comment
					comment={comment} />
			);
		}
		return (
			commentsDisplay
		);
	}
}

export default withTracker(() => {
	Meteor.subscribe("comments");

	return {
		comments: Comments.find({}).fetch()
	};
})(CommentsComp);