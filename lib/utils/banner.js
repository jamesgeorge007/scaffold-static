'use strict';

const clear = require('clear');
const figlet = require('figlet');
const chalk = require('chalk');

const { promisify } = require('util');
const printTitle = promisify(figlet);

exports.showBanner = async () => {
  clear();

  try {
    const data = await printTitle('Scaffold-Static');
    console.log(chalk.blueBright(data));
    console.log(chalk.green(' static site generator for vanilla JS.'));
  } catch (err) {
    console.log(err);
    process.exit(1);
  }

};

