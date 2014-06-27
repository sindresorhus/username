# username [![Build Status](https://travis-ci.org/sindresorhus/username.svg?branch=master)](https://travis-ci.org/sindresorhus/username)

> Get the username of the current user


## Install

```bash
$ npm install --save username
```


## Usage

```js
var username = require('username');

username(function (err, username) {
	console.log(username);
	//=> sindresorhus
});

// or

username.sync();
//=> sindresorhus
```


## API

Tries to get the username from the `LOGNAME` `USER` `LNAME` `USERNAME` environment variables. The result is cached.

### `username(callback)`

Falls back to `id -un` on OS X / Linux and `whoami` on Windows in the rare case none of the environment variables are set.

##### `callback(err, username)`

### `username.sync()`


## CLI

You can also use it as a CLI app by installing it globally:

```bash
$ npm install --global username
```

#### Usage

```bash
$ username --help

Usage
  $ username
  sindresorhus
```


## Related

- [fullname](https://github.com/sindresorhus/fullname) - Get the fullname of the current user


## License

[MIT](http://opensource.org/licenses/MIT) © [Sindre Sorhus](http://sindresorhus.com)
