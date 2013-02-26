
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//Define schemas
var UserSchema = new Schema({
	username: String,
	email: String,
	password: String,
	name: String,
	registered: { type: Date, default: Date.now },
	following: [{
		userId: {
			type: Schema.Types.ObjectId,
			required: true
		},
		username: String,
		name: String
	}],
	_follow: Boolean
});
UserSchema.virtual('follow')
	.set(function(follow) {
		this._follow = follow;
	})
	.get(function() {
		return this._follow;
	});

var TweetSchema = new Schema({
	message: String,
	author: {
		userId: {
			type: Schema.Types.ObjectId,
			required: true
		},
		username: String,
		name: String
	},
	timestamp: { type: Date, default: Date.now }
});


//Create models out of schemas
var User = mongoose.model('User', UserSchema);
var Tweet = mongoose.model('Tweet', TweetSchema);


//Handler
UserSchema.pre('save', function(next, done) {
	//TODO only update if name or username was changed
	
	Tweet.update({'author.userId': this.id}, {author: {userId: this.id, username: this.username, name: this.name}}, {multi: true}, function(err, numberAffected, raw) {
		console.log('[Tweet] The number of updated documents was %d', numberAffected);
		next(err);
	});
	
	//TODO update following list
});
