# username [![Build Status](https://travis-ci.org/sindresorhus/username.svg?branch=master)](https://travis-ci.org/sindresorhus/username)

> Get the username of the current user


## Install

```
$ npm install --save username
```


## Usage

```js
const username = require('username');

username().then(username => {
	console.log(username);
	//=> 'sindresorhus'
});
```

## API

First tries to get the username from the `LOGNAME` `USER` `LNAME` `USERNAME` environment variables. Then falls back to `$ id -un` on OS X / Linux and `$ whoami` on Windows, in the rare case none of the environment variables are set. The result is cached.

Pass `{sudo: true}` to get `$SUDO_USER`. If your program is run with `sudo` and you set this option, you'll get the non-root username.

### username()

Returns a promise for the username.

### username.sync()

Returns the username.


## Related

- [username-cli](https://github.com/sindresorhus/username-cli) - CLI for this module
- [fullname](https://github.com/sindresorhus/fullname) - Get the fullname of the current user


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
