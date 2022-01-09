const express = require('express');
const taskRouter = express.Router();
const pg = require('pg');
const poolModule = require('../module/pool');

// database connection
const config = {
    database: 'todo_list',
    host: 'localhost',
    port: 5432,
};

const pool = new pg.Pool(config);

// Verifying connection to db
pool.on("connect", () => {
    console.log('connected to postgres');
});

// Error for connection to db
pool.on('error', (err) => {
    console.log('error connecting to postgres', err);
});



// Export router for use
module.exports = taskRouter;