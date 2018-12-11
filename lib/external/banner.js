const clear = require('clear');
const figlet = require('figlet');
const chalk = require('chalk');

let showBanner = () => {

  clear();
  figlet('Scaffold-Static', (err, data) => {
    if (err) {
      console.log('Something went wrong...');
      console.dir(err);
      return;
    }
    console.log(chalk.blueBright(data));
    console.log(chalk.green(' static site generator for vanilla JS.'));
  });

}

module.exports = showBanner;