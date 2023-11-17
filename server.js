const express = require('express');
const app = express();
const database = require('./database.js');

// app.use(cors());
app.use(express.json());

const HTTP_PORT = 8080;

app.listen(process.env.PORT || HTTP_PORT, () => {
    console.log('Server is running on port: ', HTTP_PORT);
});

//* TEST GET
app.get('/api', (request, response) => { //(request, response, next)
    response.json({ message: 'OK' });
});

//* GET ALL DATA
app.get('/api/tasks', (request, response) => {
    let sqlStatement = 'SELECT * FROM task';
    let parameter = [];

    database.all(sqlStatement, parameter, (error, rows) => {
        if (error) {
            response.status(400).json({ error: error.message });
            return;
        }

        response.json({
            message: 'success',
            data: rows,
        })
    });
});

//* GET SPECIFIC BY ID
app.get('/api/task/:id', (request, response) => {
    let sqlStatement = 'SELECT * FROM task WHERE id = ?';
    let parameter = [request.params.id];

    database.all(sqlStatement, parameter, (error, row) => {
        if (error) {
            response.status(400).json({ error: error.message });
            return;
        }

        response.json({
            message: 'success',
            data: row,
        });

    });

});

//* CREATE A NEW ELEMENT
app.post('/api/task', (request, response) => {
    let errors = [];

    //TODO FILTEROPTIONEN FÜR NAME
    //? HIER KÖNNTE MAN FILTEROPTIONEN EINBAUEN DAS NAME KEINE SONDERZEICHEN ENTHALTEN DARF
    if (!request.body.name) {
        errors.push('No name specified');
    }

    if (!request.body.description) {
        errors.push('No description specified');
    }

    if (errors.length) {
        response.status(400).json({
            error: errors,
        });
    }

    let data = {
        name: request.body.name,
        description: request.body.description,
        created: Date.now(),
        updated: Date.now(),
    };

    let sqlStatement = 'INSERT INTO task (name, description, created, updated) VALUES (?,?,?,?)';

    let parameter = [data.name, data.description, data.created, data.updated];

    database.run(sqlStatement, parameter, function (error) {
        if (error) {
            response.status(400).json({ error: error.message });
            return;
        }

        response.json({
            message: 'success',
            data: data,
            id: this.lastID,
        })

    });
});

//* CHANGE A EXISTING ELEMENT
app.patch('/api/task/:id', (request, response) => {
    let data = {
        name: request.body.name,
        description: request.body.description,
        updated: Date.now(),
    };

    let sqlStatement = `
        UPDATE task SET 
        name = COALESCE(?, name),
        description = COALESCE(?, description),
        updated = ?
        WHERE id = ?`;

    let parameter = [data.name, data.description, data.updated, request.params.id];

    database.run(sqlStatement, parameter, function(error) {
        if (error) {
            response.status(400).json({ error: error.message });
            return;
        }

        response.json({
            message: 'success',
            data: data,
            changes: this.changes,
        })
    });
});

app.delete('/api/task/:id', (request, response) => {
    let sqlStatement = 'DELETE FROM task WHERE id = ?';
    let parameter = [request.params.id];

    database.run(sqlStatement, parameter, function(error) {
        if (error) {
            response.status(400).json({ error: error.message });
            return;
        }

        response.json({ message: 'success', changes: this.changes }); // should always be 1



    });
});

app.use((request, response) => {
    response.status(404).json({
        message: 'ERROR: something went wrong!',
    });
});