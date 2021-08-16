import {expectType} from 'tsd';
import {username, usernameSync} from './index.js';

expectType<Promise<string | undefined>>(username());
expectType<string | undefined>(usernameSync());
