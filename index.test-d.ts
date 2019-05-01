import {expectType} from 'tsd';
import username = require('.');

expectType<Promise<string | undefined>>(username());
expectType<string | undefined>(username.sync());
