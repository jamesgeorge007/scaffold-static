'use strict';

import execa from 'execa';
import fs from 'fs';
import inquirer from 'inquirer';
import ora from 'ora';
import path from 'path';
import showBanner from 'node-banner';

import * as logger from '../utils/logger';
import { hasYarn } from '../utils/validate';

// Setting path to the template files.
const templatePath = path.join(__dirname, '..', 'templates');

export default async (projectName: string): Promise<void> => {
    await showBanner('Scaffold Static', 'scaffolding utility for vanilla-js');
    console.log();

    // Taking in only the argument part.
    const args = process.argv.slice(3);

    // Validating if multiple arguments are supplied or not.
    if (args.length > 1) {
        logger.error(' Please provide only one argument as the project name');
        process.exit(1);
    }

    if (fs.existsSync(projectName)) {
        logger.error(` ${projectName} already exists in path`);
        process.exit(1);
    }

    const { frameworkOfChoice } = await inquirer.prompt([
        {
            name: 'frameworkOfChoice',
            type: 'list',
            message: 'Please choose the CSS framework of your choice',
            choices: ['Bootstrap-3', 'Bootstrap-4', 'Materialize', 'Foundation', 'Semantic-UI', 'Bulma', 'None'],
        },
    ]);

    // Create the project directory
    fs.mkdirSync(projectName);

    // Create css and js directory
    const cssDirPath = path.join(projectName, 'css');
    const jsDirPath = path.join(projectName, 'js');

    fs.mkdirSync(cssDirPath);
    fs.mkdirSync(jsDirPath);

    fs.writeFileSync(path.join(cssDirPath, 'style.css'), '/* Write your rulesets here! */');
    fs.writeFileSync(path.join(jsDirPath, 'main.js'), `require('../css/style.css');`);

    // Create index.html with the boilerplate content
    const template = fs.readFileSync(path.join(templatePath, frameworkOfChoice.toLowerCase(), 'index.html'), 'utf-8');
    fs.writeFileSync(path.join(projectName, 'index.html'), template);

    // Falls back to npm if yarn isn't available
    const pm = hasYarn() ? 'yarn' : 'npm';
    const installCmd = pm === 'yarn' ? 'add' : 'install';

    // Dependencies to be installed
    const deps = [
        'webpack@webpack-4',
        'webpack-cli@3',
        'webpack-dev-server',
        'css-loader',
        'style-loader',
        'html-webpack-plugin',
    ];

    // Instantiate the spinner the instance
    const spinner = ora('Getting things ready').start();

    // Installing required dependencies
    spinner.text = 'Installing dependencies';
    await execa.command(`${pm} ${installCmd} -D ${deps.join(' ')}`, { cwd: projectName });

    let pkgJson = JSON.parse(fs.readFileSync(path.join(projectName, 'package.json')).toString());

    // Add build and serve scripts
    pkgJson = {
        ...pkgJson,
        name: projectName,
        scripts: {
            ...pkgJson.scripts,
            build: 'webpack',
            serve: 'webpack serve --open',
        },
    };

    fs.writeFileSync(path.join(projectName, 'package.json'), JSON.stringify(pkgJson, null, 2));

    // Create webpack config
    const webpackConfig = fs.readFileSync(path.join(templatePath, 'webpack.config.js'));
    fs.writeFileSync(path.join(projectName, 'webpack.config.js'), webpackConfig);

    // Show success spinner
    spinner.succeed(`You're all set`);

    // Instructions to the user
    console.log();
    logger.success('Please follow these instructions:- ');
    logger.info(`cd ${projectName} && npm run serve`);
};
