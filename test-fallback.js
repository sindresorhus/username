import os from 'os';
import test from 'ava';

// Otherwise, `os.userInfo()` would take precedence over `process.env.LOGNAME`.
delete os.userInfo;

test('async', async t => {
	t.true((await require('./')()).length > 1);
});

test('sync', t => {
	t.true(require('./').sync().length > 1);
});
