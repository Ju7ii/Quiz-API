const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const categories = ['food', 'geography', 'history', 'music', 'science', 'space', 'sports', 'technology'];
const databases = [];

// Iteriere über alle Datenbanknamen
categories.forEach(category => {
    let database = new sqlite3.Database(`./databases/${category}.db`, (error) => {
        if (error) {
            throw error;
        }

        console.log(`Connected to ${category}_quiz.db`);

        // Tabelle für jede Datenbank
        database.run(
            `CREATE TABLE IF NOT EXISTS quiz_questions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                question TEXT NOT NULL,
                answer1 TEXT NOT NULL,
                answer2 TEXT NOT NULL,
                answer3 TEXT NOT NULL,
                answer4 TEXT NOT NULL,
                correct_answer INTEGER NOT NULL
            )`,
            (error) => {
                if (error) {
                    console.log(error);
                    return;
                }

                console.log(`SUCCESS: Created 'quiz_questions' Table in ${category}`);

                // Lies die JSON-Datei mit Testdaten
                const jsonFilePath = path.join(__dirname, 'data', `${category}.json`);
                const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));

                // Füge Testdaten in die Datenbank ein
                jsonData.forEach(data => {
                    const { question, answer1, answer2, answer3, answer4, correct_answer } = data;

                    const insertQuery = `INSERT INTO quiz_questions (question, answer1, answer2, answer3, answer4, correct_answer) VALUES (?, ?, ?, ?, ?, ?)`;

                    database.run(insertQuery, [question, answer1, answer2, answer3, answer4, correct_answer], (error) => {
                        if (error) {
                            console.log(`ERROR: Failed to insert data into quiz_questions at index ${index}: ${error}`);
                        } else {
                            console.count('SUCCESS: Inserted data into quiz_questions');
                        }
                    });
                });

                // Füge die erstellte Datenbank dem Array hinzu
                databases.push(database);
                console.log(databases);
            });
    });
});

module.exports = databases;  // Exportiere das Array mit allen erstellten Datenbanken
