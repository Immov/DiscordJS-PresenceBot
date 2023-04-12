const mongoose = require('mongoose');
const assign_user = require('../../models/users_name');

const User = mongoose.model('User', assign_user);

async function lookupName(userID) {
	try {
		const user = await User.findOne({ userID });
		if (!user) {
			throw new Error(`User with userID ${userID} not found`);
		}
		return user.fullName;
	} catch (error) {
		console.log(error);
		throw new Error('Fauled to get full name');
	}
}

module.exports = { lookupName };
