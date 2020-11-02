const express = require('express');
const createError = require('http-errors');
const { NOT_FOUND } = require('http-status-codes');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
require('express-async-errors');

const winston = require('./common/logger');

const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/boards.router');
const tasksRouter = require('./resources/tasks/tasks.router');
const loginRouter = require('./logging/loginRouter');
const handle = require('./errors/errorHandler');
const checkTokens = require('./common/checkTokens');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// Add express middleware which will log incoming requests to service (url, query parameters, body).

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use(
  morgan(
    ':method :status :url :query Body :body size :res[content-length] - :response-time ms',
    {
      stream: winston.stream
    }
  )
);
app.use('/login', loginRouter);
app.use(checkTokens);
app.use('/users', userRouter);
app.use('/boards', boardRouter);
boardRouter.use('/:boardId/tasks', tasksRouter);

app.use((req, res, next) => next(createError(NOT_FOUND)));

app.use(handle);

// throw Error('Oops!');
// Promise.reject(Error('Oops!'));

module.exports = app;
