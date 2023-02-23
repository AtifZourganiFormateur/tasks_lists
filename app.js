const express = require('express');
const app = express();
const db = require('./src/db/db');
const bodyParser = require('body-parser');
const Task = require('./src/models/Tasks');
const TaskList = require('./src/models/TasksLists');
const User = require('./src/models/User');
const helmet = require('helmet');
const cors = require('cors');

const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Origine non autorisée par CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app
    .use(bodyParser.json())
    //helmet -> middleware pour aider a proteger contre les injections de script, les attaques XSS, les en-têtes HTTP malveillants, etc.
    .use(helmet())
    //delimite l'acces aux endpoints
    .use(cors(corsOptions));

//path crud user
require('./src/routes/user/addUser')(app, User);
require('./src/routes/user/login')(app, User);
require('./src/routes/user/deleteUser')(app, User);
require('./src/routes/user/updateUser')(app, User);
//path crud taskslists
require('./src/routes/tasksLists/addTasksLists')(app, TaskList);
require('./src/routes/tasksLists/findAllTasksLists')(app, TaskList, Task);
require('./src/routes/tasksLists/findByPkTasksLists')(app, TaskList, Task);
require('./src/routes/tasksLists/destroyTasksLists')(app, TaskList, Task);
require('./src/routes/tasksLists/updateTasksLists')(app, TaskList);
//path crud list
require('./src/routes/task/addTask')(app, Task)
//path for test auth and token (jwt)
require('./src/routes/test')(app);


const port = process.env.PORT || 3003;

app.listen(port, () => {
  console.log(`Le serveur est en cours d'exécution sur le port ${port}`);
});
