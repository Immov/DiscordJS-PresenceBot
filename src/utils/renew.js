const assign_user = require('../models/users_name');
// Define the renew function
async function renew(userID, schemaData) {
	try {
		// First, delete any existing document for the provided userID
		await assign_user.deleteOne({ userID });

		// Then, create a new document using the provided schemaData
		await schemaData.save().catch((err) => console.error(err));
	} catch (error) {
		console.error(error);
	}
}

// Export the renew function
module.exports = { renew };
