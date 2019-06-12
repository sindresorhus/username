'use strict';
const os = require('os');
const execa = require('execa');
const mem = require('mem');

const getEnvironmentVariable = () => {
	const {env} = process;

	return (
		env.SUDO_USER ||
		env.C9_USER /* Cloud9 */ ||
		env.LOGNAME ||
		env.USER ||
		env.LNAME ||
		env.USERNAME
	);
};

const getUsernameFromOsUserInfo = () => {
	try {
		return os.userInfo().username;
	} catch (_) {}
};

const cleanWindowsCommand = string => string.replace(/^.*\\/, '');

const makeUsernameFromId = userId => `no-username-${userId}`;

module.exports = mem(async () => {
	const envVariable = getEnvironmentVariable();
	if (envVariable) {
		return envVariable;
	}

	const userInfoUsername = getUsernameFromOsUserInfo();
	if (userInfoUsername) {
		return userInfoUsername;
	}

	/**
	First we try to get the ID of the user and then the actual username. We do this because in `docker run --user <uid>:<gid>` context, we don't have "username" available. Therefore, we have a fallback to `makeUsernameFromId` for such scenario. Applies also to the `sync()` method below.
	*/
	try {
		if (process.platform === 'win32') {
			return cleanWindowsCommand(await execa.stdout('whoami'));
		}

		const userId = await execa.stdout('id', ['-u']);
		try {
			return await execa.stdout('id', ['-un', userId]);
		} catch (_) {}

		return makeUsernameFromId(userId);
	} catch (_) {}
});

module.exports.sync = mem(() => {
	const envVariable = getEnvironmentVariable();
	if (envVariable) {
		return envVariable;
	}

	const userInfoUsername = getUsernameFromOsUserInfo();
	if (userInfoUsername) {
		return userInfoUsername;
	}

	try {
		if (process.platform === 'win32') {
			return cleanWindowsCommand(execa.sync('whoami').stdout);
		}

		const userId = execa.sync('id', ['-u']).stdout;
		try {
			return execa.sync('id', ['-un', userId]).stdout;
		} catch (_) {}

		return makeUsernameFromId(userId);
	} catch (_) {}
});
