const showBanner = require('../external/banner');
const inquirer = require('inquirer');

const fs = require('fs');
const chalk = require('chalk');
const { execSync }= require('child_process');

const fileContent = [
    '{',
    'name: \'\',',
    'dependencies: {',
    '}',
    '}'
];

const scaffoleProj = (projectName) => {
    showBanner();
    setTimeout(() => {
        console.log('\n');
        if(fs.existsSync(projectName) || fs.existsSync('./package.json') ){
            console.log(chalk.redBright(` ${projectName} already exists within the path!!`));
            process.exit(1);
        }
        fs.writeFileSync('./package.json', fileContent.join('\n'));
        execSync(`mkdir ${projectName}`);
        execSync(`cd ${projectName}`);
        inquirer.prompt([{
            name: 'framework',
            type: 'list',
            message: 'Please choose the CSS framework of your choice\n',
            choices: ['Bootstrap-3', 'Bootstrap-4', 'Materialize', 'Foundation', 'Semantic-UI', 'Bulma', 'None']
      
      }])
      .then(choice => {
        // TODO
      });
    }, 100);
}

module.exports = scaffoleProj;