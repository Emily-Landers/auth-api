'use strict';

require('dotenv').config();
const express = require('express');

const cors = require('cors');
const morgan = require('morgan');

const notFoundHandler = require('./error-handlers/404.js');
const errorHandler = require('./error-handlers/500.js');
const logger = require('./middlewares/logger.js');
const v1Routes = require('./routes/v1.js');
const authRoutes = require('./routes/auth.js');

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.use(logger);

app.use(authRoutes);
app.use('/api/v1', v1Routes);

app.use('*', notFoundHandler);
app.use(errorHandler);

module.exports = {
  server: app,
  start: port => {
    if (!port) { throw new Error('Missing Port'); }
    app.listen(port, () => console.log(`Listening on ${port}`));
  },
};