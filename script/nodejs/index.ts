import { File } from './file';
import { Directory } from './directory';
import { Metadata } from './metadata';
import { Search } from './search';
import { PathUtil } from './path';
import { StringUtil } from './string';
import { ArrayUtil } from './array';
import { ObjectUtil } from './object';
import { AsyncUtil } from './async';
import { EnvUtil } from './env';
import { Command } from './command';
import { Validation } from './validation';
import { DateUtil } from './date';
import { Logger } from './log';

// Programmatically copy all static methods from all modules
export default class nj {}
Object.assign(nj, File);
Object.assign(nj, Directory);
Object.assign(nj, Metadata);
Object.assign(nj, Search);
Object.assign(nj, PathUtil);
Object.assign(nj, StringUtil);
Object.assign(nj, ArrayUtil);
Object.assign(nj, ObjectUtil);
Object.assign(nj, AsyncUtil);
Object.assign(nj, EnvUtil);
Object.assign(nj, Command);
Object.assign(nj, Validation);
Object.assign(nj, DateUtil);
Object.assign(nj, Logger);

// Export all individual classes for direct use
export {
	File,
	Directory,
	Metadata,
	Search,
	PathUtil,
	StringUtil,
	ArrayUtil,
	ObjectUtil,
	AsyncUtil,
	EnvUtil,
	Command,
	Validation,
	DateUtil,
	Logger,
};
