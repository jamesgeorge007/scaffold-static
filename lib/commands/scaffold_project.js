const showBanner = require('../external/banner');
const inquirer = require('inquirer');

const scaffoleProj = (projectName) => {
    showBanner();
    setTimeout(() => {
        console.log('\n');
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