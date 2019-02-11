#!/usr/bin/env node
'use strict';

// Dependecies
const program = require('commander');
const chalk = require('chalk');

// Action handlers for corresponding commands
const versionInfo = require('../lib/commands/version');
const scaffoldProj = require('../lib/commands/scaffold_project');

// Define commands
program
 .command('version')
 .description('Shows current version of the tool')
 .action(versionInfo);

program
  .command('new <project_name>')
  .description('Creates a static site boilerplate to work on.')
  .action(scaffoldProj);

program
  .arguments('<command>')
  .action((cmd) => {
    program.outputHelp()
    console.log(`  ` + chalk.red(`\n  Unknown command ${chalk.yellow(cmd)}.`))
    console.log()
});  

program.parse(process.argv);

if(!program.args.length){
	program.help();
}
