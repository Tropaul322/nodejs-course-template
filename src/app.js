const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/boards.router');
const tasksRouter = require('./resources/tasks/tasks.router');
const { requestLogger } = require('./common/logger');
const logger = require('./common/logger');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// Add express middleware which will log incoming requests to service (url, query parameters, body).
app.use(requestLogger);

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
boardRouter.use('/:boardId/tasks', tasksRouter);

// Add express middleware which will log all unhandled errors and return a standard message with HTTP code 500 (Internal Server Error).
app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send(err.message);
  } else {
    logger.error(err.stack);
    res.status(500).send('Internal Server Error');
  }
  next();
});

// throw Error('Oops!');
// Promise.reject(Error('Oops!'));

module.exports = app;
