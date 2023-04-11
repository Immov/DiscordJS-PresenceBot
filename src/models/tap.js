const { Schema, model } = require('mongoose');

const tapSchema = new Schema({
	userID: {
		type: String,
		required: true,
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
	},
	minute: {
		type: Number,
		min: 0,
		max: 60,
	},
});

module.exports = model('tap', tapSchema);
