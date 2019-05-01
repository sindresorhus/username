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

module.exports = mem(async () => {
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
			return cleanWindowsCommand(await execa.stdout('whoami'));
		}

		return await execa.stdout('id', ['-un']);
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

		return execa.sync('id', ['-un']).stdout;
	} catch (_) {}
});
