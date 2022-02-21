const inquirer = require('inquirer');

function create(name) {
	inquirer.prompt({
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
	}).then(answers => {
		console.log(answers);
	});
}

module.exports = create;