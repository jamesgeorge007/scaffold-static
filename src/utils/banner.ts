"use strict";

import chalk from "chalk";
const clear = require("clear");
const figlet = require("figlet");

import { promisify } from "util";
const printTitle = promisify(figlet);

const showBanner = async () => {
  clear();

  try {
    const data: any = await printTitle("Scaffold-Static", null);
    console.log(chalk.blueBright(data));
    console.log(chalk.green(" static site generator for vanilla JS."));
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default showBanner;
