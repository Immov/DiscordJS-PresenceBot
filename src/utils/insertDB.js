async function insertDB(data_in) {
	try {
		await data_in.save();
	} catch (err) {
		console.error('[MONGO] Error saving data to database:', err);
	}
}

module.exports = { insertDB };
