import { execSync, exec as execCallback } from 'node:child_process';

export class Command {
	static exec(command: string): string {
		return execSync(command, { encoding: 'utf-8' }).trim();
	}

	static execAsync(command: string): Promise<string> {
		return new Promise((resolve, reject) => {
			execCallback(command, (error: Error | null, stdout: string) => {
				if (error) reject(error);
				else resolve(stdout.trim());
			});
		});
	}

	static execWithOutput(command: string): {
		stdout: string;
		stderr: string;
		code: number;
	} {
		try {
			const stdout = execSync(command, { encoding: 'utf-8' });
			return { stdout: stdout.trim(), stderr: '', code: 0 };
		} catch (error: unknown) {
			const err = error as {
				stdout?: Buffer;
				stderr?: Buffer;
				status?: number;
				message?: string;
			};
			return {
				stdout: err.stdout?.toString() ?? '',
				stderr: err.stderr?.toString() ?? err.message ?? '',
				code: err.status ?? 1,
			};
		}
	}
}
