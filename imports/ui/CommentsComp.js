import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";

import Comment from "./Comment.js";
import CommentInput from "./CommentInput.js";

import { Comments } from "../api/comments.js";

class CommentsComp extends Component {
	render() {
		let agency = this.props.agency;
		let route = this.props.route;
		let comments = this.props.comments;
		let user = this.props.user;
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
			<div className="comments-comp">
				<h3>Comments for this TimeTable:</h3>
				{user !== null ?
					<CommentInput
						agency={agency}
						route={route} />
					:
					<div className="only-logged-in"><em>Only logged in users can comment.</em></div>
				}
				{commentsDisplay}
			</div>
		);
	}
}

export default withTracker(({agency, route}) => {
	Meteor.subscribe("comments");

	return {
		comments: Comments.find({
			$and: [
				{
					agency,
					route
				}
			]
		}).fetch(),
		user: Meteor.user()
	};
})(CommentsComp);