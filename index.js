const { mergeFiles } = require('./utils/fileMerger');
const { generateFolderStructure } = require('./utils/folderStructure');
const { rootPath, sourcePath, isFormattedName } = require('./utils/config');

mergeFiles(rootPath, sourcePath, isFormattedName);
generateFolderStructure(rootPath, sourcePath, isFormattedName);

