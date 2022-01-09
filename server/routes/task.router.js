const express = require('express');
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

    let queryText = `SELECT * FROM "todo"`

    pool.query(queryText).then((result) =>{
        res.sendStatus(result.rows);
    })
    .catch((err) => {
        console.log('error getting tasks', err);
        res.sendStatus(500);
    });  
}); // End of get endpoint


// Export router for use
module.exports = taskRouter;