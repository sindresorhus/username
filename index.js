'use strict';
var exec = require('child_process').exec;
var username;
var env = process.env;
var first = true;

module.exports = function (cb) {
	if (!first) {
		return cb(null, username);
	}

	first = false;

	username = env.LOGNAME || env.USER || env.LNAME || env.USERNAME;

	if (username) {
		return cb(null, username);
	}

	if (process.platform === 'darwin' || process.platform === 'linux') {
		exec('id -un', function (err, stdout) {
			if (err) {
				return cb();
			}

			username = stdout.trim();

			cb(null, username);
		});
	} else if (process.platform === 'win32') {
		exec('whoami', function (err, stdout) {
			if (err) {
				return cb();
			}

			username = stdout.trim().replace(/^.*\\/, '');

			cb(null, username);
		});
	} else {
		cb();
	}
};

module.exports.sync = require('./sync');
