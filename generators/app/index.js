'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
    prompting: function () {
        console.log('yeoman prompting');

        // Have Yeoman greet the user.
        this.log(yosay(
            'Welcome to the finest ' + chalk.red('generator-react-native-redux-enzyme-jsdom') + ' generator!'
        ));

        var prompts = [{
            type: 'input',
            name: 'projectName',
            message: 'Enter the name of the project you are creating.',
            default: 'NewProject'
        }];

        return this.prompt(prompts).then(function (props) {
            // To access props later use this.props.projectName;
            this.props = props;
        }.bind(this));
    },

    writing: function () {
        return new Promise((resolve, reject) => {
            this.log(yosay(
                'Running ' + chalk.red('react-native init') + '.  This may take a few minutes...'
            ));
            this.spawnCommand('react-native', ['init', this.props.projectName]).on("close", () => {
                this.destinationRoot(this.destinationRoot() + "/" + this.props.projectName);

                this.fs.copyTpl(
                    this.templatePath('index.js'),
                    this.destinationPath('index.android.js'),
                    { projectName: this.props.projectName }
                );

                this.fs.copyTpl(
                    this.templatePath('index.js'),
                    this.destinationPath('index.ios.js'),
                    { projectName: this.props.projectName }
                );

                this.fs.copy(
                    this.templatePath('jsdom.js'),
                    this.destinationPath('test-utils/jsdom.js')
                );

                this.fs.copy(
                    this.templatePath('MainComponent.js'),
                    this.destinationPath('MainComponent.js')
                );

                this.fs.copy(
                    this.templatePath('MainComponent-test.js'),
                    this.destinationPath('__tests__/MainComponent-test.js')
                );

                this.fs.copy(
                    this.templatePath('store.js'),
                    this.destinationPath('store.js')
                );

                this.fs.copy(
                    this.templatePath('reducer.js'),
                    this.destinationPath('reducer.js')
                );

                this.fs.delete(this.destinationPath('__tests__/index.android.js'));
                this.fs.delete(this.destinationPath('__tests__/index.ios.js'));

                addJestSetupFiles(this.destinationPath('package.json'), resolve);
            });
        });
    },

    install: function () {
        console.log('yeoman install');
        this.npmInstall(['redux', 'react-redux', 'redux-thunk'], {'save': true});
        this.npmInstall(['enzyme', 'react-test-renderer', 'jsdom', 'react-dom', 'react-addons-test-utils'], {'save-dev': true});
        this.installDependencies();
    }
});

let addJestSetupFiles = (packageJsonPath, cb) => {
    let fs = require('fs');
    let path = require('path')
    let obj = {
        "preset": "jest-react-native",
        "setupFiles": [
            path.join("test-utils","jsdom.js")
        ]
    };
    fs.readFile(packageJsonPath, 'utf-8', function (err, data) {
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
        fs.writeFile(packageJsonPath, JSON.stringify(data, null, 4), 'utf-8', function (err) {
            console.info("Wrote Package.json:", "err?", err);
            cb();
        });

    });
}
