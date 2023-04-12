const { Schema, model } = require('mongoose');

const userSchema = new Schema({
	userID: {
		type: String,
		required: true,
	},
	fullName: {
		type: String,
		require: true,
	},
});

module.exports = model('assign_user', userSchema);
