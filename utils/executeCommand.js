module.exports = function executeCommand(command, argv, cwd) {
	// eslint-disable-next-line no-async-promise-executor
	return new Promise(async (resolve, reject) => {
		const { execa } = await import('execa');

		argv = argv || [];

		const child = execa(command, argv, {
			cwd,
			stdio: ['inherit', 'pipe', 'inherit'],
		});

		child.stdout.on('data', buffer => {
			process.stdout.write(buffer);
		});

		child.on('close', code => {
			if (code) {
				reject(new Error(`command failed: ${command}`));
			}
			resolve();
		});
	});
};