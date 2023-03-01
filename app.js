const express = require('express');
const app = express();
const db = require('./src/db/db');
const bodyParser = require('body-parser');
const Task = require('./src/models/Tasks');
const TaskList = require('./src/models/TasksLists');
const User = require('./src/models/User');
const Role = require('./src/models/Role');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const allowedOrigins = ['*'];
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
    .use(cors())
    //permet a express de parser les cookies envoyé par le navigateur du user
    .use(cookieParser());

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
//path crud tasks
require('./src/routes/task/addTask')(app, Task);
require('./src/routes/task/destroyTask')(app, Task);
require('./src/routes/task/activeOrInactiveTask')(app, Task);
require('./src/routes/task/findTaskByPk')(app, Task);
require('./src/routes/task/updateTask')(app, Task);
//path for test auth and token (jwt)
require('./src/routes/test')(app);


const port = process.env.PORT || 3003;

app.listen(port, () => {
  console.log(`Le serveur est en cours d'exécution sur le port ${port}`);
});
