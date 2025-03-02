const fs = require('fs');
const path = require('path');
const { isFileAllowed } = require('./fileChecker');
const { getFormattedFileName } = require('./helpers');

const generateFolderStructure = (rootPath, sourcePath,  useFormattedName) => {
    const outputFileName = getFormattedFileName(rootPath, sourcePath, useFormattedName, true);
    const outputPath = path.join(sourcePath, outputFileName);
    const writeStream = fs.createWriteStream(outputPath);

    const readDir = (dir, indent = '') => {
        const files = fs.readdirSync(dir);

        files.forEach((file, index) => {
            const filePath = path.join(dir, file);
            const isDirectory = fs.statSync(filePath).isDirectory();
            const prefix = index === files.length - 1 ? '└── ' : '├── ';

            if (isDirectory) {
                writeStream.write(`${indent}${prefix}${file}/\n`);
                readDir(filePath, indent + '   ');
            } else if (isFileAllowed(filePath, rootPath)) {
                writeStream.write(`${indent}${prefix}${file}\n`);
            }
        });
    };

    writeStream.write(`${path.basename(sourcePath)}/\n`);
    readDir(sourcePath);
    writeStream.end();
};

module.exports = { generateFolderStructure };
