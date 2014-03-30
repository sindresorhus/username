'use strict';
var username;
var env = process.env;
var first = true;

module.exports = function () {
	if (first) {
		first = false;
		username = env.LOGNAME || env.USER || env.LNAME || env.USERNAME;
	}

	return username;
};
