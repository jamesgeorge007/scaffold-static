#!/usr/bin/env node
'use strict';

const program = require('commander');
const kleur = require('kleur');

const scaffoldProject = require('../lib/commands/scaffold').default;

program.version(require('../package').version).usage('<command> [options]');

program
  .command('new <project_name>')
  .option('--use-npm', 'Use npm as the package manager')
  .description('Scaffolds a static site boilerplate template to work on.')
  .action(scaffoldProject);

program.on('command:*', ([cmd]) => {
  program.outputHelp();
  console.log(`  ` + kleur.red(`\n  Unknown command ${kleur.yellow(cmd)}.`));
  console.log();
});

program.parse(process.argv);
