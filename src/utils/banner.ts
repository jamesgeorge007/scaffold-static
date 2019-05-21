'use strict';

import chalk from 'chalk';
import * as clear from '../types/clear';
import * as figlet from '../types/figlet';

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
