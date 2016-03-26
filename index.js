'use strict';
const childProcess = require('child_process');
const execa = require('execa');
const mem = require('mem');

function getEnvVar() {
 const env = process.env;
 return env.SUDO_USER || env.LOGNAME || env.USER || env.LNAME || env.USERNAME;
}

let settings = {
 platform: {
  DARWIN: 'darwin',
  LINUX: 'linux',
  WINDOW: 'win32',
  COMMAND: 'whoami',
  ECODING: {
   UTF8: 'utf8'
  }
 },
 REGEX: /^.*\\/
};

function cleanWinCmd(x) {
 return x.replace(settings.REGEX, '');
}

function noop() { }

module.exports = mem(() => {
 const envVar = getEnvVar();

 if (envVar) {
  return Promise.resolve(envVar);
 }

 if (process.platform === settings.platform.DARWIN || process.platform === settings.platform.LINUX) {
  return execa('id', ['-un']).then(x => x.stdout).catch(noop);
 } else if (process.platform === settings.platform.WINDOW) {
  return execa(settings.platform.COMMAND).then(x => cleanWinCmd(x.stdout)).catch(noop);
 }

 return Promise.resolve();
});

module.exports.sync = mem(() => {
 const envVar = getEnvVar();

 if (envVar) {
  return envVar;
 }

 try {
  if (process.platform === settings.platform.DARWIN || process.platform === settings.platform.LINUX) {
   // TODO: use `execa` when it gets support for sync methods
   return childProcess.execFileSync('id', ['-un'], { encoding: settings.platform.ECODING.UTF8 });
  } else if (process.platform === settings.platform.WINDOW) {
   return cleanWinCmd(childProcess.execFileSync(settings.platform.COMMAND, { encoding: settings.platform.ECODING.UTF8 }));
  }
 } catch (err) { }
});
