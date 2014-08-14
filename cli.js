#!/usr/bin/env node
'use strict';
var pkg = require('./package.json');
var username = require('./');
var argv = process.argv.slice(2);

function help() {
	console.log([
		'',
		'  ' + pkg.description,
		'',
		'  Usage',
		'    username'
	].join('\n'));
}

if (argv.indexOf('--help') !== -1) {
	help();
	return;
}

if (argv.indexOf('--version') !== -1) {
	console.log(pkg.version);
	return;
}

username(function (err, username) {
	console.log(username);
});
