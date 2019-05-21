'use strict';

const { showBanner } = require('../utils/banner');
const inquirer = require('inquirer');

const fs = require('fs');
const chalk = require('chalk');
const open = require('open');
const mkdirp = require('mkdirp');
const { execSync } = require('child_process');

// Initial file content to be written to package.json
const fileContent = ['{', '"name": "",', '"dependencies": {', '}', '}'];

const templatePath = `${__dirname}/../templates`;

// Starter template files
const bootstrapThreeTemplate = fs.readFileSync(
  `${templatePath}/bootstrap-3/index.html`,
  'utf-8',
);
const bootstrapFourTemplate = fs.readFileSync(
  `${templatePath}/bootstrap-4/index.html`,
  'utf-8',
);
const materializeTemplate = fs.readFileSync(
  `${templatePath}/materialize/index.html`,
  'utf-8',
);
const foundationTemplate = fs.readFileSync(
  `${templatePath}/foundation/index.html`,
  'utf-8',
);
const semanticUiTemplate = fs.readFileSync(
  `${templatePath}/semantic-ui/index.html`,
  'utf-8',
);
const bulmaTemplate = fs.readFileSync(
  `${templatePath}/bulma/index.html`,
  'utf-8',
);
const basicTemplate = fs.readFileSync(
  `${templatePath}/none/index.html`,
  'utf-8',
);

const serveTemplate = projectName => {
  open(`${projectName}/index.html`);
  console.log(
    chalk.greenBright(
      `\n Generated the following files within ${require('path').join(
        process.cwd(),
        projectName,
      )}`,
    ),
  );
  console.log(
    chalk.cyan(
      '\n 1.index.html\n 2.static/stylesheets/style.css\n 3.static/main.js',
    ),
  );
  console.log(
    chalk.yellowBright(
      `\n Serving ${chalk.red.dim('index.html')} within your default browser!!`,
    ),
  );
};

exports.scaffoldProject = async projectName => {
  await showBanner();
  // Taking in only the argument part
  const args = process.argv.slice(3);

  // Validating if multiple arguments are supplied or not
  if (args.length > 1) {
    console.log(
      chalk.red.bold(' Kindly provide only one argument as the project name!!'),
    );
    process.exit(1);
  }

  if (fs.existsSync(projectName)) {
    console.log(
      chalk.redBright(` ${projectName} already exists within the path!!`),
    );
    process.exit(1);
  }
  execSync(`mkdir ${projectName}`);

  fileContent[1] = `"name": "${projectName}",`;
  fs.writeFileSync(`${projectName}/package.json`, fileContent.join('\n'));

  inquirer
    .prompt([
      {
        name: 'framework',
        type: 'list',
        message: 'Please choose the CSS framework of your choice\n',
        choices: [
          'Bootstrap-3',
          'Bootstrap-4',
          'Materialize',
          'Foundation',
          'Semantic-UI',
          'Bulma',
          'None',
        ],
      },
    ])
    .then(choice => {
      mkdirp.sync(`${projectName}/static`);
      mkdirp.sync(`${projectName}/static/stylesheets`);
      fs.writeFileSync(
        `${projectName}/static/stylesheets/style.css`,
        '// Write your rulesets here!',
      );
      fs.writeFileSync(
        `${projectName}/static/main.js`,
        '// Any sorts of JavaScript code goes here!',
      );

      if (choice.framework === 'Bootstrap-3') {
        fs.writeFileSync(`${projectName}/index.html`, bootstrapThreeTemplate);
      } else if (choice.framework === 'Bootstrap-4') {
        fs.writeFileSync(`${projectName}/index.html`, bootstrapFourTemplate);
      } else if (choice.framework === 'Materialize') {
        fs.writeFileSync(`${projectName}/index.html`, materializeTemplate);
      } else if (choice.framework === 'Foundation') {
        fs.writeFileSync(`${projectName}/index.html`, foundationTemplate);
      } else if (choice.framework === 'Semantic-UI') {
        fs.writeFileSync(`${projectName}/index.html`, semanticUiTemplate);
      } else if (choice.framework === 'Bulma') {
        fs.writeFileSync(`${projectName}/index.html`, bulmaTemplate);
      } else {
        fs.writeFileSync(`${projectName}/index.html`, basicTemplate);
      }
      serveTemplate(projectName);
    });
};
