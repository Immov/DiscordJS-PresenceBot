const assign_user = require('../models/users_name');

async function lookupName(user_id) {
	try {
		const user = await assign_user.findOne({ userID: user_id });
		if (user) {
			return user.fullName;
		} else {
			return user_id;
		}
	} catch (err) {
		console.error(err);
		return user_id;
	}
}

module.exports = { lookupName };
