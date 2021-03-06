const express = require('express');

const morgan = require('morgan');

const cors = require('cors');

require('log-timestamp');

const app = express(); // Variables 

app.set('port', process.env.PORT || 4250);
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use('/api/projects', require('./routes/projects.routes'));
app.use('/api/projects_catalog', require('./routes/projects_catalog.routes')); //

app.use('/api/contractors', require('./routes/contractors.routes'));
app.use('/api/providers', require('./routes/provider.routes'));
app.use('/api/services', require('./routes/services.routes'));
app.use('/api/users', require('./routes/users.routes'));
app.use('/api/messages', require('./routes/whatsapp.routes'));
app.use('/api/tasks', require('./routes/tasks.routes')); //

app.use('/api/gantt', require('./routes/gantt.routes'));
app.use('/api/files', require('./routes/files.routes')); //app.use('/api/projects',require('./routes/projects.routes'));

module.exports = app;