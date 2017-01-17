import os from 'os';
import test from 'ava';

test.serial('username()', async t => {
	os.userInfo = () => ({username: 'unicorn'});
	t.is(await require('./')(), 'unicorn');
});

test.serial('username.sync()', t => {
	os.userInfo = () => ({username: 'unicorn2'});
	t.is(require('./').sync(), 'unicorn2');
});
