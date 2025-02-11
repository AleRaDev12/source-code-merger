const path = require('path');
const { withTilde } = require('./helpers');
const { config } = require('./config');

const isFileAllowed = (filePath, basePath) => {
    const relativePath = path.relative(basePath, filePath).replace(/\\/g, '/');
    const pathParts = relativePath.split('/');
    const filename = path.basename(filePath);

    if (withTilde(filename)) return false;

    const isInBlacklistedFolder = config.blackList.folders.some(folder => pathParts.includes(folder));
    const isBlacklistedFile = config.blackList.files.some(pattern => filename.endsWith(pattern));

    return !isBlacklistedFile && !isInBlacklistedFolder;
};

module.exports = { isFileAllowed };
