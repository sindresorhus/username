import process from 'node:process';
import os from 'node:os';
import execa from 'execa';
import mem from 'mem';

const getEnvironmentVariable = () => {
	const {env} = process;

	return (
		env.SUDO_USER
		|| env.C9_USER
		|| /* Cloud9 */ env.LOGNAME
		|| env.USER
		|| env.LNAME
		|| env.USERNAME
	);
};

const getUsernameFromOsUserInfo = () => {
	try {
		return os.userInfo().username;
	} catch {}
};

const cleanWindowsCommand = string => string.replace(/^.*\\/, '');

const makeUsernameFromId = userId => `no-username-${userId}`;

export const username = mem(async () => {
	const environmentVariable = getEnvironmentVariable();
	if (environmentVariable) {
		return environmentVariable;
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
			const {stdout} = await execa('whoami');
			return cleanWindowsCommand(stdout);
		}

		const {stdout: userId} = await execa('id', ['-u']);
		try {
			const {stdout} = await execa('id', ['-un', userId]);
			return stdout;
		} catch {}

		return makeUsernameFromId(userId);
	} catch {}
});

export const usernameSync = mem(() => {
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

		const {stdout: userId} = execa.sync('id', ['-u']);
		try {
			return execa.sync('id', ['-un', userId]).stdout;
		} catch {}

		return makeUsernameFromId(userId);
	} catch {}
});
