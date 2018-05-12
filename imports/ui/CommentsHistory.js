import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";

import Comment from "./Comment.js";

import { Comments } from "../api/comments.js";

class CommentsHistory extends Component {
	render() {
		let comments = this.props.comments;
		let commentsDisplay = <div></div>;
		if (comments) {
			if (comments.length !== 0) {
				commentsDisplay = comments.map(comment =>
					<Comment
						key={comment._id}
						comment={comment}
						handleCommentClick={this.props.handleCommentClick} />
				);
			} else {
				commentsDisplay = "There are no comments.";
			}
		}
		return (
			<div>
				<h1>Comments history:</h1>
				{commentsDisplay}
			</div>
		);
	}
}

export default withTracker(() => {
	Meteor.subscribe("comments");

	return {
		comments: Comments
			.find({}, {sort: {createdAt: -1}}).fetch(),
		user: Meteor.user()
	};
})(CommentsHistory);