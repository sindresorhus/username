import os from 'os';
import test from 'ava';

// Remove `os.userInfo()` and reset ENV flags to avoid them taking precedence
delete os.userInfo;
process.env.LOGNAME = '';
process.env.USER = '';
process.env.LNAME = '';
process.env.USERNAME = '';

test('async', async t => {
	t.true((await require('.')()).length > 1);
});

test('sync', t => {
	t.true(require('.').sync().length > 1);
});
