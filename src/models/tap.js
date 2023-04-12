const { Schema, model } = require('mongoose');

const tapSchema = new Schema({
	userID: {
		type: String,
		required: true,
	},
	fullName: {
		type: String,
	},
	tap: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
	reason: {
		type: String,
	},
	proofURL: {
		type: String,
	},
	hour: {
		type: Number,
		min: 0,
		max: 24,
		required: true,
	},
	minute: {
		type: Number,
		min: 0,
		max: 60,
		required: true,
	},
});

module.exports = model('tap', tapSchema);
