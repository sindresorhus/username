/* eslint-env mocha */
'use strict';
var assert = require('assert');

it('should get the username from fallback', function (cb) {
	process.env.LOGNAME = '';
	process.env.USER = '';
	process.env.LNAME = '';
	process.env.USERNAME = '';

	var username = require('./');

	username(function (err, username) {
		assert(username.length > 1);
		cb();
	});
});
