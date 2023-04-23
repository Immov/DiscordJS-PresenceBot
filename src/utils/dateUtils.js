// dateUtils.js
module.exports = {
	getFormattedTimestamp: function () {
		const now = new Date();
		const zone = (now.getTimezoneOffset() / 60) * -1;
		const unixTime = (Date.now() / 1000) | 0;
		return `<t:${unixTime}:t> - <t:${unixTime}:d>`;
	},
};
