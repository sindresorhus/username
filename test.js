import os from 'os';
import test from 'ava';

// Otherwise, `os.userInfo()` would take precedence over `process.env.LOGNAME`.
delete os.userInfo;

test.serial('username()', async t => {
	process.env.LOGNAME = 'unicorn';
	t.is(await require('./')(), 'unicorn');
});

test.serial('username.sync()', t => {
	process.env.LOGNAME = 'unicorn2';
	t.is(require('./').sync(), 'unicorn2');
});
