const { mergeFiles } = require('./utils/fileMerger');
const { generateFolderStructure } = require('./utils/folderStructure');
const { ROOT_PATH, sourcePath } = require('./utils/config');

const useFormattedName = true;

mergeFiles(sourcePath, ROOT_PATH, useFormattedName);
generateFolderStructure(sourcePath, ROOT_PATH, useFormattedName);

