# username

> Get the username of the current user

This module is meant for informational purposes and not for secure identification.

## Install

```sh
npm install username
```

*This package only works in Node.js, not in browsers.*

## Usage

```js
import {username} from 'username';

console.log(await username());
//=> 'sindresorhus'
```

## API

It first tries to get the username from the `SUDO_USER` `LOGNAME` `USER` `LNAME` `USERNAME` environment variables. Then falls back to `$ id -un` on macOS / Linux and `$ whoami` on Windows, in the rare case none of the environment variables are set. The result is cached.

### `username(): Promise<string | undefined>`

Returns the username.

### `usernameSync(): string | undefined`

Returns the username.

## Related

- [username-cli](https://github.com/sindresorhus/username-cli) - CLI for this module
- [fullname](https://github.com/sindresorhus/fullname) - Get the fullname of the current user
