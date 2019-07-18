const fs = require('fs');
const path = require('path');
const colors = require('colors');

colors.setTheme({
    silly: 'rainbow',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'red',
    info: 'green',
    data: 'blue',
    help: 'cyan',
    warn: 'yellow',
    debug: 'magenta',
    error: 'red'
});

module.exports = (dir, log) => {
    const reg = new RegExp(`${dir}/`);
    (next = (folderPath) => {
        fs.readdirSync(folderPath).forEach(path => {
            const fullPath = `${folderPath}/${path}`;
            if (fs.lstatSync(fullPath).isDirectory()) {
                next(fullPath);
            } else {
                const logPath = fullPath.replace(reg, '');
                console.log(`${logPath}`.info);
            }
        })
    })(dir);
    const filename = dir.split('/').reverse()[0];
    console.log(`\n 🛠  ${filename} create complete\n`.data);
    console.log(`cd ${filename}`.warn);
    console.log(`open with mpTool\n`.warn);
}