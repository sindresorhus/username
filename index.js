'use strict';
const childProcess = require('child_process');
const execa = require('execa');
const mem = require('mem');

function getEnvVar() {
	const env = process.env;
	return env.SUDO_USER || env.LOGNAME || env.USER || env.LNAME || env.USERNAME;
}

function cleanWinCmd(x) {
	return x.replace(/^.*\\/, '');
}

function noop() {}

module.exports = mem(() => {
	const envVar = getEnvVar();

	if (envVar) {
		return Promise.resolve(envVar);
	}

	if (process.platform === 'darwin' || process.platform === 'linux') {
		return execa('id', ['-un']).then(x => x.stdout).catch(noop);
	} else if (process.platform === 'win32') {
		return execa('whoami').then(x => cleanWinCmd(x.stdout)).catch(noop);
	}

	return Promise.resolve();
});

module.exports.sync = mem(() => {
	const envVar = getEnvVar();

	if (envVar) {
		return envVar;
	}

	try {
		if (process.platform === 'darwin' || process.platform === 'linux') {
			// TODO: use `execa` when it gets support for sync methods
			return childProcess.execFileSync('id', ['-un'], {encoding: 'utf8'});
		} else if (process.platform === 'win32') {
			return cleanWinCmd(childProcess.execFileSync('whoami', {encoding: 'utf8'}));
		}
	} catch (err) {}
});
