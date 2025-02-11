require('dotenv').config();

const FILE_SUFFIX = '_source';
const STRUCTURE_SUFFIX = '_structure';

module.exports = {
    ROOT_PATH: process.env.ROOT_PATH,
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
                '.cache', '.jpg', '.png', '.Designer.cs', '.resx', '.xaml',
                '.manifest', '.json', '.csproj', 'ShellContextMenu.cs',
                '.baml', '.i.cs', 'png', '.svg', `${FILE_SUFFIX}.txt`, `${STRUCTURE_SUFFIX}.txt`
            ],
            folders: ['node_modules', '.git'],
        }
    }
};
