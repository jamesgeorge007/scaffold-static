const showBanner = require('../external/banner');

const scaffoleProj = (projectName) => {
    showBanner();
    setTimeout(() => {
        console.log(`\nProject name: ${projectName}\n`);
    }, 100);
}

module.exports = scaffoleProj;