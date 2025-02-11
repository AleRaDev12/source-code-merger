const fs = require('fs');
const path = require('path');
const { isFileAllowed } = require('./fileChecker');
const { getFormattedFileName } = require('./helpers');
const { ROOT_PATH, sourcePath } = require('./config');

const mergeFiles = (startPath, basePath, useFormattedName = false) => {
    const outputFileName = getFormattedFileName(startPath, useFormattedName);
    const outputPath = path.join(startPath, outputFileName);
    const writeStream = fs.createWriteStream(outputPath);

    const readDir = (dir) => {
        const files = fs.readdirSync(dir);

        files.forEach(file => {
            const filePath = path.join(dir, file);
            if (fs.statSync(filePath).isDirectory()) {
                readDir(filePath);
            } else if (isFileAllowed(filePath, basePath)) {
                const relativeFilePath = path.relative(basePath, filePath).replace(/\\/g, '/'); // Относительный путь
                writeStream.write(`\n-------------\nFile: ${relativeFilePath}:\n`);
                writeStream.write(fs.readFileSync(filePath, 'utf-8') + '\n');
            }
        });
    };

    readDir(startPath);
    writeStream.end();
};

module.exports = { mergeFiles };

