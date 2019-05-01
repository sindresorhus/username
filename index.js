'use strict';
const os = require('os');
const execa = require('execa');
const mem = require('mem');

const getEnvVariable = () => {
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

const cleanWinCmd = x => x.replace(/^.*\\/, '');

module.exports = mem(async () => {
	const envVariable = getEnvVariable();
	if (envVariable) {
		return envVariable;
	}

	const userInfoUsername = getUsernameFromOsUserInfo();
	if (userInfoUsername) {
		return userInfoUsername;
	}

	try {
		if (process.platform === 'win32') {
			const whoamiResult = await execa('whoami');
			return cleanWinCmd(whoamiResult.stdout);
		}

		const idResult = await execa('id', ['-un']);
		return idResult.stdout;
	} catch (_) {}
});

module.exports.sync = mem(() => {
	const envVariable = getEnvVariable();
	if (envVariable) {
		return envVariable;
	}

	const userInfoUsername = getUsernameFromOsUserInfo();
	if (userInfoUsername) {
		return userInfoUsername;
	}

	try {
		if (process.platform === 'win32') {
			return cleanWinCmd(execa.sync('whoami').stdout);
		}

		return execa.sync('id', ['-un']).stdout;
	} catch (_) {}
});
