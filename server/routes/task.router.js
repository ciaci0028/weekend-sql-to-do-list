const express = require('express');
// const router = require('express').Router();
const taskRouter = express.Router();
// const pg = require('pg');
const pool = require('../module/pool');

// database connection
// const config = {
//     database: 'todo_list',
//     host: 'localhost',
//     port: 5432,
// };

// const pool = new pg.Pool(config);

// Verifying connection to db
// pool.on("connect", () => {
//     console.log('connected to postgres');
// });

// // Error for connection to db
// pool.on('error', (err) => {
//     console.log('error connecting to postgres', err);
// });

// Get endpoint
taskRouter.get('/', (req, res) => {
    console.log('in get /tasks');

    let queryText = `SELECT * FROM "todo"`;

    pool.query(queryText)
        .then((dbRes) => {
            res.send(dbRes.rows);
            console.log('success', dbRes.rows);
        })
        .catch((err) => {
            console.log('error getting tasks', err);
            res.sendStatus(500);
        });  
}); // End of get endpoint

// Post endpoint
taskRouter.post('/', (req, res) => {
    console.log('in post /tasks', req.body);

    // Setting req.body to a new variable
    let newTask = req.body;

    // Query text to insert the new task into the database
    let queryText = `
        INSERT INTO "todo"
            ("task", "notes", "completion" )
        VALUES ($1, $2, $3)
    `;

    // check if the task is completed
    let isTaskComplete = (newTask.completed === 'true');
    
    // query params so people can't break it
    let queryParams = [
        newTask.task,
        newTask.notes,
        isTaskComplete
    ];

    // verify it's been added to the database
    pool.query(queryText, queryParams)
        .then(() => {
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log('Error adding new koala', err);
        });
}); // End POST endpoint 

// Delete endpoint
taskRouter.delete ('/:id', (req, res) => {
    console.log('in delete /tasks', req.params.id);

    // Create request for database
    let queryText = `
        DELETE FROM "todo"
        WHERE id = $1;
    `;

    // Make it secret so people can't break it
    let queryParams = [
        req.params.id
    ];

    pool.query(queryText, queryParams)
        .then( () => {
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log('failed to delete', err);
            res.sendStatus(500);
        });

}); // End of delete endpoint


// Export router for use
module.exports = taskRouter;