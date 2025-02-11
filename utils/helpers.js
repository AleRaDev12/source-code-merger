const path = require('path');
const { FILE_SUFFIX, STRUCTURE_SUFFIX } = require('./config');

const withTilde = (name) => name.startsWith('~') || name.endsWith('~');

const getFormattedFileName = (sourcePath, useFormattedName = false, isStructure = false) => {
    let formattedName = useFormattedName
        ? sourcePath.replace(/\\/g, '-').replace(/^.*?src-/, '')
        : 'allFiles';

    formattedName += isStructure ? STRUCTURE_SUFFIX : FILE_SUFFIX;
    return `${formattedName}.txt`;
};

module.exports = { withTilde, getFormattedFileName };
