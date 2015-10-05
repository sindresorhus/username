#!/usr/bin/env node
'use strict';
var meow = require('meow');
var username = require('./');

meow([
	'Example',
	'  $ username',
	'  sindresorhus'
]);

username(function (err, username) {
	console.log(username);
});
