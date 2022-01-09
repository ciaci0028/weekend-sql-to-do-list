const pg = require('pg');

// database connection
const config = {
    database: 'todo_list', 
    host: 'localhost', 
    port: 5432, 
};

const pool = new pg.Pool(config);

pool.on("connect", () => {
    console.log("connected to postgres");
});

pool.on("error", (err) => {
    console.log("error connecting to postgres", err);
});

module.exports = pool;