function insertDB(data_in) {
	data_in.save().catch((err) => console.error(err));
}

module.exports = { insertDB };
