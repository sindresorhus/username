import process from 'node:process';
import test from 'ava';
import {username, usernameSync} from './index.js';

test.serial('username()', async t => {
	process.env.LOGNAME = 'unicorn';
	t.is(await username(), 'unicorn');
});

test.serial('username.sync()', t => {
	process.env.LOGNAME = 'unicorn2';
	t.is(usernameSync(), 'unicorn2');
});
