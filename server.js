const express = require('express');
const app = express();
// app.use(cors());
app.use(express.json());

const initializeDatabases = require('./database.js');
const getCategoriesFromJSONFiles = require('./getCategoriesFromJSONFiles');

// Database instance code
let databases;

class CategoryRouteHandler {
    constructor(app, database, category) {
        this.app = app;
        this.database = database;
        this.category = category;
        this.setupRoutes();
    }

    setupRoutes() {
        this.app.get(`/api/${this.category}`, (request, response) => {
            console.log(`Handling request for /api/${this.category}`);
            let sqlStatement = `SELECT * FROM ${this.category}_quiz_questions`;
            let parameter = [];

            this.database.all(sqlStatement, parameter, (error, rows) => {
                if (error) {
                    console.error(`Error handling request for /api/${this.category}: ${error}`);
                    response.status(400).json({ error: error.message });
                    return;
                }

                response.json({
                    message: 'success',
                    data: rows,
                });
            });
        });

        // Add more routes for the category here if needed
    }
}

// Wait for the initialization of databases
initializeDatabases()
    .then((database) => {
        databases = database;

        // Example call
        getCategoriesFromJSONFiles()
            .then(categories => {
                console.log('Dynamically generated categories:', categories);

                // You could use the categories in your application here
                for (const category of categories) {
                    new CategoryRouteHandler(app, databases, category);
                }

                app.use((request, response) => {
                    console.error(`404 - Route not found: ${request.originalUrl}`);
                    response.status(404).json({
                        message: 'ERROR: something went wrong!',
                    });
                });

                // Start the Express app
                const HTTP_PORT = process.env.PORT || 8080;
                app.listen(HTTP_PORT, () => {
                    console.log(`Server is running on port: ${HTTP_PORT}`);
                });
            })
            .catch(error => console.error('Error getting categories:', error));
    })
    .catch((error) => {
        console.error(`Error initializing databases: ${error}`);
    });

// TEST GET
app.get('/testDatabase', (request, response) => {
    response.json({ message: 'Database is up!' });
});






