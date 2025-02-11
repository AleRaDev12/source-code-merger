const fs = require('fs');
const path = require('path');
const { isFileAllowed } = require('./fileChecker');
const { getFormattedFileName } = require('./helpers');

const generateFolderStructure = (startPath, basePath, useFormattedName) => {
    const outputFileName = getFormattedFileName(startPath, useFormattedName, true); // передаём флаг структуры
    const outputPath = path.join(startPath, outputFileName);
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
            } else if (isFileAllowed(filePath, basePath)) {
                writeStream.write(`${indent}${prefix}${file}\n`);
            }
        });
    };

    writeStream.write(`${path.basename(startPath)}/\n`);
    readDir(startPath);
    writeStream.end();
};

module.exports = { generateFolderStructure };
