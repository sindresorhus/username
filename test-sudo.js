import test from 'ava';

test.serial('username({sudo: true})', async t => {
	process.env.SUDO_USER = 'unicorn king';
	t.is(await require('./')({sudo: true}), 'unicorn king');
});

test.serial('username.sync({sudo: true})', async t => {
	process.env.SUDO_USER = 'unicorn queen';
	t.is(await require('./').sync({sudo: true}), 'unicorn queen');
});
