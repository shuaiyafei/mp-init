const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');
const getLog = require('./getLog');
const PWD = process.env.PWD;

const getProjectName = (filename) => {
    const questions = [{
        message: '请输入要创建的项目名称',
        type: 'input',
        name: 'PROJECT_NAME',
        default: filename,
        validate(name) {
            const targetPath = path.resolve(PWD, `./${name}`);
            const existStatus = fs.existsSync(targetPath);
            if (!existStatus) {
                fs.mkdirSync(targetPath);
            } else {
                console.log(`\n🌚 文件夹${name}已存在`);
                process.exit();
            }
            return !!name;
        }

    }, {
        message: '请选择一种模板',
        type: 'list',
        name: 'PROJECT_TYPE',
        choices: [
            `simple`,
            `general`
        ]
    }]
    return inquirer.prompt(questions);
};

module.exports = async (n) => {
    const {
        PROJECT_NAME,
        PROJECT_TYPE
    } = await getProjectName(n);

    const sourcePath = `${path.resolve(__dirname, `../template`)}/*`;
    const targetPath = PWD + '/' + PROJECT_NAME;

    // 执行命令
    let command = `cp -r ${sourcePath} ${targetPath}`;
    exec(command, null, (err) => {
        if (PROJECT_TYPE === 'general') {
            const reg = new RegExp(sourcePath);
            command = command.replace(reg, `${path.resolve(__dirname, `../expand`)}/*`);
            exec(command, null, () => {
                getLog(targetPath);
            });
        } else {
            getLog(targetPath);
        }
    });
};