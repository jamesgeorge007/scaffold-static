"use strict";

import * as execa from "execa";
import * as fs from "fs";
import * as inquirer from "inquirer";
import * as kleur from "kleur";
import * as mkdirp from "mkdirp";
import showBanner = require("node-banner");
import * as ora from "ora";

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
 * @returns {Promise<void>}
 */

export default async (projectName: string): Promise<void> => {
  await showBanner("Scaffold Static", "scaffolding utility for vanilla-js");

  // Taking in only the argument part.
  const args = process.argv.slice(3);

  // Validating if multiple arguments are supplied or not.
  if (args.length > 1) {
    console.log(
      kleur
        .red()
        .bold(" Kindly provide only one argument as the project name!!")
    );
    process.exit(1);
  }

  if (fs.existsSync(projectName)) {
    console.log(
      kleur.red().bold(` ${projectName} already exists within the path!!`)
    );
    process.exit(1);
  }
  execa.commandSync(`mkdir ${projectName}`);

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
  mkdirp.sync(`${projectName}/css`);
  mkdirp.sync(`${projectName}/js`);

  fs.writeFileSync(
    `${projectName}/css/style.css`,
    "/* Write your rulesets here! */"
  );
  fs.writeFileSync(`${projectName}/js/main.js`, `require('../css/style.css');`);

  const template = fs.readFileSync(
    `${templatePath}/${frameworkOfChoice.toLowerCase()}/index.html`,
    "utf-8"
  );
  fs.writeFileSync(`${projectName}/index.html`, template);

  // Navigate to the respective directory to execute shell commands
  process.chdir(projectName);

  // Instantiate the spinner the instance
  const spinner = ora("Getting things ready").start();

  // Generate package.json template
  await execa.command("npm init -y");

  // Installing required dependencies
  spinner.text = "Installing dependencies";
  await execa.command(
    "npm install --save-dev webpack webpack-cli webpack-dev-server css-loader style-loader html-webpack-plugin"
  );

  let pkgJson = JSON.parse(fs.readFileSync("./package.json").toString());

  // Add build and serve scripts
  pkgJson = {
    ...pkgJson,
    scripts: {
      ...pkgJson.scripts,
      build: "webpack",
      serve: "webpack-dev-server --open"
    }
  };

  fs.writeFileSync("./package.json", JSON.stringify(pkgJson));

  const webpackConfig = fs.readFileSync(`${templatePath}/webpack.config.js`);
  // Write back the config
  fs.writeFileSync("webpack.config.js", webpackConfig);
  // Show success spinner
  spinner.succeed(`You're all set`);

  console.log(kleur.green().bold("Please follow these instructions:- "));
  console.log(kleur.cyan().bold(`cd ${projectName} && npm run serve`));
};
