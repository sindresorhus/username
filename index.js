'use strict';
const os = require('os');
const execa = require('execa');
const mem = require('mem');

const getEnvVar = () => {
	const {env} = process;

	return env.SUDO_USER ||
		env.C9_USER /* Cloud9 */ ||
		env.LOGNAME ||
		env.USER ||
		env.LNAME ||
		env.USERNAME;
};

const cleanWinCmd = x => x.replace(/^.*\\/, '');

const noop = () => {};

module.exports = mem(() => {
	const envVar = getEnvVar();

	if (envVar) {
		return Promise.resolve(envVar);
	}

	if (os.userInfo) {
		return Promise.resolve(os.userInfo().username);
	}

	if (process.platform === 'win32') {
		return execa('whoami').then(x => cleanWinCmd(x.stdout)).catch(noop);
	}

	return execa('id', ['-un']).then(x => x.stdout).catch(noop);
});

module.exports.sync = mem(() => {
	const envVar = getEnvVar();

	if (envVar) {
		return envVar;
	}

	if (os.userInfo) {
		return os.userInfo().username;
	}

	try {
		if (process.platform === 'win32') {
			return cleanWinCmd(execa.sync('whoami').stdout);
		}

		return execa.sync('id', ['-un']).stdout;
	} catch (_) {}
});
