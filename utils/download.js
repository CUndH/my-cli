const download = require('download-git-repo');
const repo = require('../utils/repo');

module.exports = function downloadTemplate(type, target) {
	return new Promise((resolve) => {
		download(
			repo[type],
			target,
			(err) => {
				console.log(err, 'error');
				resolve();
			}
		);
	});
};
