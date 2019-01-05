const showBanner = require('../external/banner');
const inquirer = require('inquirer');

const program = require('commander');
const fs = require('fs');
const chalk = require('chalk');
const elegantSpinner = require('elegant-spinner');
const logUpdate = require('log-update');
const opn = require('opn');
const mkdirp = require('mkdirp');
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

const templatePath = `${__dirname}/../external/boilerplate`;

// Starter template files
const bootstrapThreeFile = fs.readFileSync(`${templatePath}/bootstrap-3/index.html`, 'utf-8');
const bootstrapFourFile = fs.readFileSync(`${templatePath}/bootstrap-4/index.html`, 'utf-8');
const materializeFile = fs.readFileSync(`${templatePath}/materialize/index.html`, 'utf-8');
const foundationFile = fs.readFileSync(`${templatePath}/foundation/index.html`, 'utf-8');
const semanticUiFile = fs.readFileSync(`${templatePath}/semantic-ui/index.html`, 'utf-8');
const bulmaFile = fs.readFileSync(`${templatePath}/bulma/index.html`, 'utf-8');
const noFrameworkFile = fs.readFileSync(`${templatePath}/none/index.html`, 'utf-8');

const serveTemplate = (projectName) => {
    opn(`${projectName}/index.html`);
    console.log(chalk.greenBright(`\n Generated the following files within ${process.cwd()}${projectName}`));
    console.log(chalk.cyan('\n 1.index.html\n 2.static/stylesheets/style.css\n 3.static/main.js'));
    console.log(chalk.yellowBright(`\n Serving ${chalk.red.dim('index.html')} within your default browser!!`));
};

const scaffoleProj = (projectName) => {
    
    showBanner();
    // Taking in only the argument part
    const args = process.argv.slice(3);

    setTimeout(() => {
    	
        console.log('\n');
        // Validating if multiple arguments are supplied or not
        if (args.length > 1){
        	console.log(chalk.red.bold(' Kindly provide only one arguement as the project name!!'));
        	process.exit(1);
        }

        if (fs.existsSync(projectName)){
            console.log(chalk.redBright(` ${projectName} already exists within the path!!`));
            process.exit(1);
        }
        execSync(`mkdir ${projectName}`);
        fileContent[1] = `\"name\": \"${projectName}\",`
        fs.writeFileSync(`${projectName}/package.json`, fileContent.join('\n'));
        inquirer.prompt([{
            name: 'framework',
            type: 'list',
            message: 'Please choose the CSS framework of your choice\n',
            choices: ['Bootstrap-3', 'Bootstrap-4', 'Materialize', 'Foundation', 'Semantic-UI', 'Bulma', 'None']
      
      }])
      .then(choice => {

        mkdirp.sync(`${projectName}/static`);
        mkdirp.sync(`${projectName}/static/stylesheets`);
        fs.writeFileSync(`${projectName}/static/stylesheets/style.css`, '// Write your rulesets here!');
        fs.writeFileSync(`${projectName}/static/main.js`, '// Any sorts of JavaScript code goes here!');

        if (choice.framework === 'Bootstrap-3'){
            fs.writeFileSync(`${projectName}/index.html`, bootstrapThreeFile);
        } else if (choice.framework === 'Bootstrap-4'){
            fs.writeFileSync(`${projectName}/index.html`, bootstrapFourFile);
        } else if (choice.framework === 'Materialize'){
            fs.writeFileSync(`${projectName}/index.html`, materializeFile);
        } else if (choice.framework === 'Foundation'){
            fs.writeFileSync(`${projectName}/index.html`, foundationFile);   
        } else if (choice.framework === 'Semantic-UI'){
            fs.writeFileSync(`${projectName}/index.html`, semanticUiFile);    
        } else if (choice.framework === 'Bulma'){
            fs.writeFileSync(`${projectName}/index.html`, bulmaFile);    
        } else {
            fs.writeFileSync(`${projectName}/index.html`, noFrameworkFile);        
        }
        serveTemplate(projectName);
      });
    }, 500);
};

module.exports = scaffoleProj;