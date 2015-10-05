/* eslint-env mocha */
'use strict';
var assert = require('assert');

it('username() - should get the username of the current user', function (cb) {
	var username = require('./');

	process.env.LOGNAME = 'unicorn';

	username(function (err, username) {
		assert.equal(username, 'unicorn');
		cb();
	});
});

it('username.sync() - should get the username of the current user', function () {
	var username = require('./').sync;

	process.env.LOGNAME = 'unicorn2';

	assert.strictEqual(username(), 'unicorn2');
});
