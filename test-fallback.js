import process from 'node:process';
import os from 'node:os';
import test from 'ava';
import {username, usernameSync} from './index.js';

// Remove `os.userInfo()` and reset ENV flags to avoid them taking precedence
delete os.userInfo;
process.env.LOGNAME = '';
process.env.USER = '';
process.env.LNAME = '';
process.env.USERNAME = '';

test('async', async t => {
	const username_ = await username();
	t.true(username_?.length > 1);
});

test('sync', t => {
	t.true(usernameSync()?.length > 1);
});
