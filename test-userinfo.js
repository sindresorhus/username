import process from 'node:process';
import os from 'node:os';
import test from 'ava';
import {username, usernameSync} from './index.js';

process.env.LOGNAME = '';
process.env.USER = '';
process.env.LNAME = '';
process.env.USERNAME = '';

test.serial('username()', async t => {
	os.userInfo = () => ({username: 'unicorn'});
	t.is(await username(), 'unicorn');
});

test.serial('username.sync()', t => {
	os.userInfo = () => ({username: 'unicorn2'});
	t.is(usernameSync(), 'unicorn2');
});
