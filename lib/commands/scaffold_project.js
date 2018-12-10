const showBanner = require('../external/banner');
const inquirer = require('inquirer');

const fs = require('fs');
const chalk = require('chalk');
const elegantSpinner = require('elegant-spinner');
const logUpdate = require('log-update');
const opn = require('opn');
const { execSync }= require('child_process');

const frame = elegantSpinner();

// Initial file content to be written to package.json
const fileContent = [
    '{',
    '\"name\": \"\",',
    '\"dependencies": {',
    '}',
    '}'
];

// Starter template file contents
const bootstrapThreeFile = fs.readFileSync(__dirname + '/boilerplate/bootstrap-3/index.html', 'utf-8');
const bootstrapFourFile = fs.readFileSync(__dirname + '/boilerplate/bootstrap-4/index.html', 'utf-8');
const materializeFile = fs.readFileSync(__dirname + '/boilerplate/materialize/index.html', 'utf-8');
const foundationFile = fs.readFileSync(__dirname + '/boilerplate/foundation/index.html', 'utf-8');
const semanticUiFile = fs.readFileSync(__dirname + '/boilerplate/semantic-ui/index.html', 'utf-8');
const bulmaFile = fs.readFileSync(__dirname + '/boilerplate/bulma/index.html', 'utf-8');

const scaffoleProj = (projectName) => {
    showBanner();
    setTimeout(() => {
        console.log('\n');
        if(fs.existsSync(projectName)){
            console.log(chalk.redBright(` ${projectName} already exists within the path!!`));
            process.exit(1);
        }
        execSync(`mkdir ${projectName}`);
        execSync(`cd ${projectName}`);
        fileContent[1] = `\"name\": \"${projectName}\",`
        fs.writeFileSync(`${projectName}/package.json`, fileContent.join('\n'));
        inquirer.prompt([{
            name: 'framework',
            type: 'list',
            message: 'Please choose the CSS framework of your choice\n',
            choices: ['Bootstrap-3', 'Bootstrap-4', 'Materialize', 'Foundation', 'Semantic-UI', 'Bulma', 'None']
      
      }])
      .then(choice => {
        
        if(choice.framework === 'Bootstrap-3'){
            fs.writeFileSync('./index.html', bootstrapThreeFile);
            opn('./index.html');
            console.log(chalk.greenBright('\n Serving within your default browser!'));
        } else if(choice.framework === 'Bootstrap-4'){
            fs.writeFileSync('./index.html', bootstrapFourFile);
            opn('./index.html');
            console.log(chalk.green('\n Serving website within your default browser!'));    
        }  else if(choice.framework === 'Materialize'){
            fs.writeFileSync('./index.html', materializeFile);
            opn('./index.html');
            console.log(chalk.green('\n Serving website within your default browser!'));    
        }
      });
    }, 100);
}

module.exports = scaffoleProj;