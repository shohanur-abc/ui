export interface PlaywrightConfig {
	browserName?: 'chromium' | 'firefox' | 'webkit';
	executablePath?: string;
	headless?: boolean;
	viewport?: { width: number; height: number };
	timeout?: number;
}

export const DEFAULT_CONFIG: PlaywrightConfig = {
	executablePath: '/usr/bin/brave-browser',
	browserName: 'chromium',
	headless: true,
	viewport: { width: 1280, height: 800 },
	timeout: 60000,
};
