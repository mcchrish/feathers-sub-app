'use strict';

const app = require('feathers')();
const serveStatic = require('feathers').static;
const favicon = require('serve-favicon');
const configuration = require('feathers-configuration');
const path = require('path');

const app1 = require('./app-1/app');
const app2 = require('./app-2/app');

app.configure(configuration(path.join(__dirname, '.')))
  .use('/', serveStatic(app.get('public')))
  .use(favicon(path.join(app.get('public'), 'favicon.ico')));

const port = app.get('port');

app.use('/app-1', app1);
app.use('/app-2', app2);

const server = app.listen(port);

app1.setup(server);
app2.setup(server);

server.on('listening', () =>
  console.log(`Feathers application started on ${app.get('host')}:${port}`)
);
