"use strict";

import chalk from "chalk";
import { execSync } from "child_process";
import * as fs from "fs";
import * as inquirer from "inquirer";
import * as mkdirp from "mkdirp";
import showBanner = require("node-banner");
import * as open from "open";

// Initial file content to be written to package.json.
const fileContent: string[] = [
  "{",
  '"name": "",',
  '"dependencies": {',
  "}",
  "}"
];

// Setting path to the template files.
const templatePath: string = `${__dirname}/../templates`;

/**
 * @param {String} projectName - Name of the project as supplied by the user
 * @returns {void}
 */

const serveTemplate = (projectName: string) => {
  open(`${projectName}/index.html`);
  console.log();
  console.log(
    chalk.green.bold(
      ` Generated the following files within ${require("path").join(
        process.cwd(),
        projectName
      )}`
    )
  );
  console.log();
  console.log(
    chalk.cyan(
      " 1.index.html\n 2.static/stylesheets/style.css\n 3.static/main.js"
    )
  );
  console.log();
  console.log(
    chalk.yellow.bold(
      ` Serving ${chalk.red.dim("index.html")} within your default browser!!`
    )
  );
};

/**
 * @param {String} projectName - Name of the project as supplied by the user
 * @returns {Promise<void>}
 */

export default async (projectName: string): Promise<void> => {
  await showBanner("Scaffold Static", "scaffolding utility for vanilla-js");

  // Taking in only the argument part.
  const args = process.argv.slice(3);

  // Validating if multiple arguments are supplied or not.
  if (args.length > 1) {
    console.log(
      chalk.red.bold(" Kindly provide only one argument as the project name!!")
    );
    process.exit(1);
  }

  if (fs.existsSync(projectName)) {
    console.log(
      chalk.red.bold(` ${projectName} already exists within the path!!`)
    );
    process.exit(1);
  }
  execSync(`mkdir ${projectName}`);

  fileContent[1] = `"name": "${projectName}",`;
  fs.writeFileSync(`${projectName}/package.json`, fileContent.join("\n"));

  const { frameworkOfChoice } = await inquirer.prompt([
    {
      name: "frameworkOfChoice",
      type: "list",
      message: "Please choose the CSS framework of your choice",
      choices: [
        "Bootstrap-3",
        "Bootstrap-4",
        "Materialize",
        "Foundation",
        "Semantic-UI",
        "Bulma",
        "None"
      ]
    }
  ]);
  mkdirp.sync(`${projectName}/static`);
  mkdirp.sync(`${projectName}/static/stylesheets`);

  fs.writeFileSync(
    `${projectName}/static/stylesheets/style.css`,
    "// Write your rulesets here!"
  );
  fs.writeFileSync(
    `${projectName}/static/main.js`,
    "// Any sorts of JavaScript code goes here!"
  );

  const template = fs.readFileSync(
    `${templatePath}/${frameworkOfChoice.toLowerCase()}/index.html`,
    "utf-8"
  );
  fs.writeFileSync(`${projectName}/index.html`, template);
  serveTemplate(projectName);
};
