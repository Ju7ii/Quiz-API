//* IMPORT EXPRESS
const express = require('express');
const app = express();

//* MIDDLEWARE FOR HANDLING JSON REQUESTS
app.use(express.json());

//* CONNECT DATABASE AND CATEGORIES
const initializeDatabases = require('./database.js');
const getCategoriesFromJSONFiles = require('./getCategoriesFromJSONFiles');

//* DATABASE INSTANCE
let databases;

//* CLASS FOR HANDLING ROUTES FOR EACH CATEGORY
class CategoryRouteHandler {
    constructor(app, database, category) {
        this.app = app;
        this.database = database;
        this.category = category;
        this.setupRoutes();
    }

    //* SETUP ROUTES FOR EACH CATEGORY
    setupRoutes() {
        this.app.get(`/api/${this.category}`, (request, response) => {
            console.log(`Handling request for /api/${this.category}`);

            //* SQL QUERY
            let sqlStatement = `SELECT * FROM ${this.category}_quiz_questions`;
            let parameter = [];

            //* EXECUTE QUERY
            this.database.all(sqlStatement, parameter, (error, rows) => {
                //* ERROR -> SEND BACK ERRORMESSAGE
                if (error) {
                    console.error(`Error handling request for /api/${this.category}: ${error}`);
                    response.status(400).json({ error: error.message });
                    return;
                }

                //* SUCCESS -> SEND BACK DATA
                response.json({
                    message: 'success',
                    data: rows,
                });
            });
        });

        // TODO
        //? VLLT NOCH MEHRERE ROUTEN ANLEGEN

    }
}

//* WAIT FOR INITIALIZATION OF DATABASE
initializeDatabases()
    .then((database) => {
        databases = database;

        getCategoriesFromJSONFiles()
            .then(categories => {
                console.log('Dynamically generated categories:', categories);

                for (const category of categories) {
                    new CategoryRouteHandler(app, databases, category);
                }

                //* 404 ERROR HANDLING
                app.use((request, response) => {
                    console.error(`404 - Route not found: ${request.originalUrl}`);
                    response.status(404).json({
                        message: 'ERROR: something went wrong!',
                    });
                });

                //* START THE EXPRESS APPLICATION
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

//* TEST GET ROUTE FOR DATABASE STATUS
app.get('/testDatabase', (request, response) => {
    response.json({ message: 'Database is up!' });
});
