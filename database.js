const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs').promises;
const getCategoriesFromJSONFiles = require('./getCategoriesFromJSONFiles');

//* Function to check if a table is empty
async function isTableEmpty(database, category) {
    return new Promise((resolve, reject) => {
        database.get(`SELECT COUNT(*) as count FROM ${category}_quiz_questions`, (error, result) => {
            if (error) {
                reject(`ERROR: Checking if table is empty failed - ${error}`);
            } else {
                resolve(result.count === 0);
            }
        });
    });
}

//* Function to create a table if it doesn't exist
async function createTable(database, category) {
    return new Promise((resolve, reject) => {
        database.run(
            `CREATE TABLE IF NOT EXISTS ${category}_quiz_questions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                category TEXT NOT NULL,
                question TEXT NOT NULL,
                answer1 TEXT NOT NULL,
                answer2 TEXT NOT NULL,
                answer3 TEXT NOT NULL,
                answer4 TEXT NOT NULL,
                correct_answer INTEGER NOT NULL
            )`,
            (error) => {
                if (error) {
                    reject(`ERROR: Creating table failed - ${error}`);
                } else {
                    console.log(`SUCCESS: Table created - ${category}`);
                    resolve();
                }
            }
        );
    });
}

//* Function to insert data into a table
async function insertData(database, category, jsonData) {
    return Promise.all(jsonData.map(data => {
        const { question, answer1, answer2, answer3, answer4, correct_answer } = data;
        const insertQuery = `INSERT INTO ${category}_quiz_questions (category, question, answer1, answer2, answer3, answer4, correct_answer) VALUES (?, ?, ?, ?, ?, ?, ?)`;

        return new Promise((resolve, reject) => {
            database.run(insertQuery, [category, question, answer1, answer2, answer3, answer4, correct_answer], (error) => {
                if (error) {
                    reject(`ERROR: Could not create data in table - ${category}: quiz_questions - ${error}`);
                } else {
                    resolve();
                }
            });
        });
    }));
}

//* Main function to initialize a database for a category
async function initializeDatabase(database, category) {

    await createTable(database, category);

    const tableIsEmpty = await isTableEmpty(database, category);

    if (tableIsEmpty) {
        console.log(`SUCCESS: Table is empty - Populating with data - ${category}`);
        const jsonFilePath = path.join(__dirname, 'data', `${category}.json`);
        const jsonData = JSON.parse(await fs.readFile(jsonFilePath, 'utf-8'));

        await insertData(database, category, jsonData);
        console.count(`SUCCESS: Data created in table for ${category}: quiz_questions`);
    } else {
        console.log(`INFO: Table already contains data - Skip filling data - ${category}`);
    }
    console.log('-------------------------');
}

//* Exporting the database initialization function for use in server.js
module.exports = async function initializeDatabases() {
    const dbPath = './databases/main.db'; // Path to the main database
    const database = new sqlite3.Database(dbPath);

    try {
        //* Dynamically generate categories from available JSON files
        const categories = await getCategoriesFromJSONFiles();

        console.log('-------------------------');
        console.log(`CATEGORIES FOUND IN DATA: ${categories}`);
        console.log('-------------------------');
        
        //* Loop through all categories and initialize the corresponding tables
        for (const category of categories) {
            await initializeDatabase(database, category);
        }
        console.log('SUCCESS: Database is ready');
        return database; // Returning only the database instance
    } catch (error) {
        console.error(`ERROR: Initializing databases failed - ${error}`);
        throw error;
    }
};
