console.log('server.js working');

// Standard beginning stuff for functionality
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 5000;
const taskRouter = require('./routes/task.router');


// Body Parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

// ROUTES
app.use('/tasks', taskRouter);

// Start listening for requests on a specific port
app.listen(PORT, () => {
    console.log('listening on port', PORT);
});