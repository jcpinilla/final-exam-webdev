import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";

export const Comments = new Mongo.Collection("comments");

if (Meteor.isServer) {
	Meteor.publish("comments", function commentsPublication() {
		return Comments.find();
	});
}

Meteor.methods({
	"comments.insert"(agencyTag, routeTag, text) {
		let commentId = "" + (Comments.find({}).count() + 1);
		let comment = {
			_id: commentId,
			author: Meteor.user().username,
			text,
			agencyTag,
			routeTag
		};
		Comments.insert(comment);
	}
});