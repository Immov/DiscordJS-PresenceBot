const now = new Date();
let hour = now.getHours();
let minute = now.getMinutes();
// 2 Digits hour & minutes
hour = hour <= 9 ? '0' + hour : hour;
minute = minute <= 9 ? '0' + minute : minute;

const zone = (now.getTimezoneOffset() / 60) * -1;

const unixTime = (Date.now() / 1000) | 0;
const timestamp = `<t:${unixTime}:t> - <t:${unixTime}:d>`;

module.exports = { now, hour, minute, zone, unixTime, timestamp };
