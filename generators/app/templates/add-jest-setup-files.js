#!/usr/local/bin/node
var fs = require('fs');
var path = require('path')
var packageJsonPath = process.argv[2];
var obj = {
	"preset": "jest-react-native",
	"setupFiles": [
		path.join("./test-utils","jsdom.js")
	]
}
fs.readFile(path.join(packageJsonPath, 'package.json'), 'utf-8', function (err, data) {
	data = JSON.parse(data);
	if (!data.jest) {
		data.jest = obj;
	} else {
		if (!data.jest.preset) {
			data.jest.preset = obj.preset;
		}
		if (!data.jest.setupFiles) {
			data.jest.setupFiles = obj.setupFiles;
		} else {
			if (data.jest.setupFiles.indexOf("test-utils/jsdom.js") == -1) {
				data.jest.setupFiles.push("test-utils/jsdom.js");
			}
		}
	}
	fs.writeFile(path.join(packageJsonPath, 'package.json'), JSON.stringify(data, null, 4), 'utf-8', function (err) {
		console.info("Wrote Package.json:", "err?", err);
	})

});