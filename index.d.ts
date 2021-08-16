/**
Get the username of the current user.

It first tries to get the username from the `SUDO_USER` `LOGNAME` `USER` `LNAME` `USERNAME` environment variables. Then falls back to `$ id -un` on macOS / Linux and `$ whoami` on Windows, in the rare case none of the environment variables are set. The result is cached.

@returns The username.

@example
```
import {username} from 'username';

console.log(await username());
//=> 'sindresorhus'
```
*/
export function username(): Promise<string | undefined>;

/**
Synchronously get the username of the current user.

It first tries to get the username from the `SUDO_USER` `LOGNAME` `USER` `LNAME` `USERNAME` environment variables. Then falls back to `$ id -un` on macOS / Linux and `$ whoami` on Windows, in the rare case none of the environment variables are set. The result is cached.

@returns The username.

@example
```
import {usernameSync} from 'username';

console.log(usernameSync());
//=> 'sindresorhus'
```
*/
export function usernameSync(): string | undefined;
