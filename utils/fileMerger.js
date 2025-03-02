const fs = require('fs');
const path = require('path');
const { isFileAllowed } = require('./fileChecker');
const { getFormattedFileName } = require('./helpers');

const mergeFiles = (rootPath, sourcePath, useFormattedName = false) => {
    const outputFileName = getFormattedFileName(rootPath, sourcePath, useFormattedName);
    console.log('*-* outputFileName', outputFileName);
    const outputPath = path.join(sourcePath, outputFileName);
    const writeStream = fs.createWriteStream(outputPath);

    const readDir = (dir) => {
        const files = fs.readdirSync(dir);

        files.forEach(file => {
            const filePath = path.join(dir, file);
            if (fs.statSync(filePath).isDirectory()) {
                readDir(filePath);
            } else if (isFileAllowed(filePath, rootPath)) {
                const relativeFilePath = path.relative(rootPath, filePath).replace(/\\/g, '/'); // Относительный путь
                writeStream.write(`\n-------------\nFile: ${relativeFilePath}:\n`);
                writeStream.write(fs.readFileSync(filePath, 'utf-8') + '\n');
            }
        });
    };

    readDir(sourcePath);
    writeStream.end();
};

module.exports = { mergeFiles };

