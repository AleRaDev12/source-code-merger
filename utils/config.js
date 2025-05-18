require('dotenv').config();

const FILE_SUFFIX = '_source';
const STRUCTURE_SUFFIX = '_structure';

module.exports = {
    rootPath: process.env.ROOT_PATH,
    sourcePath: process.env.SOURCE_PATH,
    FILE_SUFFIX: FILE_SUFFIX,
    STRUCTURE_SUFFIX: STRUCTURE_SUFFIX,
    config: {
        whiteList: {
            files: [],
            folders: [],
        },
        blackList: {
            files: [
                ...process.env.BLACKLIST_FILES
                    .split(',')
                    .map(s => s.trim())
                    .filter(s => !!s),
                `${FILE_SUFFIX}.txt`, `${STRUCTURE_SUFFIX}.txt`
            ],
            folders:  process.env.BLACKLIST_FOLDERS
                .split(',')
                .map(s => s.trim())
                .filter(s => !!s),
        }
    },
    isFormattedName: process.env.IS_FORMATTED_NAME.toLowerCase() === "true",
};
