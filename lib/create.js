const inquirer = require('inquirer');
const path = require('path');
const downloadTemplate = require('../utils/download');
const executeCommand = require('../utils/executeCommand');
const fs = require('fs-extra');

function create(name) {
	inquirer.prompt([{
		type: 'list',
		name: 'type',
		message: 'which template would you want to choice for your work',
		choices: [{
			name: 'Vue',
			value: 'vue',
		}, {
			name: 'React',
			value: 'react'
		}, {
			name: 'weapp',
			value: 'weapp'
		}],
	},{
		name: 'lodash',
		type: 'confirm',
		when: answers => answers.type === 'vue',
		message: 'Would you want to add lodash in your project?'
	}]).then(async (answers) => {

		const { default: ora } = await import('ora');
		
		const spinner = ora('Downloading template ...').start();

		const { type, lodash } = answers;
		const target = `${path.resolve('../')}/${name}`;
		await downloadTemplate(type, target);

		spinner.stop();

		const pkg = require(`${target}/package.json`);
		if (lodash) {
			pkg.dependencies = Object.assign(pkg.dependencies, {
				'@types/lodash': '^4.14.161',
				'lodash': '^4.17.20'
			});

			fs.writeFileSync(`${target}/package.json`, JSON.stringify(pkg, null, '\t'));
		}

		console.log('\n 开始下载依赖 ...');
		await executeCommand('npm', ['install'], target);
		console.log('\n 依赖下载完成 ...');
	});
}

module.exports = create;