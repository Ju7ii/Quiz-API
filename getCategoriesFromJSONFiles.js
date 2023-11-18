const fs = require('fs').promises;
const path = require('path');

//* MAIN FUNCTION
async function getCategoriesFromJSONFiles() {
    const dataDir = path.join(__dirname, 'data');
    const files = await fs.readdir(dataDir);
    const jsonFiles = files.filter(file => file.endsWith('.json'));
    const categories = jsonFiles.map(file => path.basename(file, '.json'));
    return categories;
}

//* EXPORT CATEGORIES FROM FOLDER "DATA"
module.exports = getCategoriesFromJSONFiles;