import { BrowserManager } from './browser';
import { Cookies } from './cookies';
import { Export } from './export';
import { Interact } from './interact';
import { Navigation } from './navigation';
import { PageManager } from './page-manager';
import { Query } from './query';
import { Utils as PlaywrightUtils } from './utils';

// Extended Utility Class - automatically merges all utilities
export class pw {}

// Programmatically copy all static methods from all modules
Object.assign(pw, BrowserManager);
Object.assign(pw, Cookies);
Object.assign(pw, Export);
Object.assign(pw, Interact);
Object.assign(pw, Navigation);
Object.assign(pw, PageManager);
Object.assign(pw, Query);
Object.assign(pw, PlaywrightUtils);

// Export all individual classes for direct use
export { BrowserManager, Cookies, Export, Interact, Navigation, PageManager, Query, PlaywrightUtils as Utils };
export default pw;