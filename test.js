'use strict';
var assert = require('assert');

describe('username()', function () {
	it('should get the username of the current user', function (cb) {
		var username = require('./index');

		process.env.LOGNAME = 'unicorn';

		username(function (err, username) {
			assert.equal(username, 'unicorn');
			cb();
		});
	});
});

describe('username.sync()', function () {
	it('should get the username of the current user', function () {
		var username = require('./index').sync;

		process.env.LOGNAME = 'unicorn2';

		assert.strictEqual(username(), 'unicorn2');
	});
});
