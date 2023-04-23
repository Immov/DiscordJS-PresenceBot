const { createWriteStream } = require('fs');
const { join } = require('path');

const logStream = createWriteStream(
	join(__dirname, `../../logs/${new Date().toISOString().slice(0, 10)}.log`),
	{ flags: 'a' }
);

const logger = (message) => (
	logStream.write(`${new Date().toISOString()} ${message}\n`),
	process.stdout.write(`${message}\n`)
);

module.exports = logger;
