#!/usr/bin/env node
'use strict';
var fs = require('fs');
var pkg = require('./package.json');
var getUsername = require('./index');
var input = process.argv[2];

function help() {
	console.log(pkg.description);
	console.log('');
	console.log('Usage');
	console.log('  $ username');
	console.log('  sindresorhus');
}

if (process.argv.indexOf('-h') !== -1 || process.argv.indexOf('--help') !== -1) {
	help();
	return;
}

if (process.argv.indexOf('-v') !== -1 || process.argv.indexOf('--version') !== -1) {
	console.log(pkg.version);
	return;
}

getUsername(function (err, username) {
	console.log(username);
});
