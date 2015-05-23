#!/usr/bin/env node
'use strict';
var meow = require('meow');
var username = require('./');

meow({
	help: [
		'Usage',
		'  username'
	].join('\n')
});

username(function (err, username) {
	console.log(username);
});
