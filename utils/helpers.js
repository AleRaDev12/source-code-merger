const { FILE_SUFFIX, STRUCTURE_SUFFIX } = require('./config');

const withTilde = (name) => name.startsWith('~') || name.endsWith('~');

const getFormattedFileName = (rootPath, sourcePath, useFormattedName = false, isStructure = false) => {
    let formattedName = useFormattedName
        ? sourcePath.replace(rootPath, '').replace(/[:\\]/g, '-').replace(/^-/, '')
        : 'all';

    formattedName += isStructure ? STRUCTURE_SUFFIX : FILE_SUFFIX;
    return `${formattedName}.txt`;
};


module.exports = { withTilde, getFormattedFileName };
