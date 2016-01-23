import test from 'ava';

test.serial('username()', async t => {
	process.env.LOGNAME = 'unicorn';
	t.is(await require('./')(), 'unicorn');
});

test.serial('username.sync()', async t => {
	process.env.LOGNAME = 'unicorn2';
	t.is(await require('./').sync(), 'unicorn2');
});
