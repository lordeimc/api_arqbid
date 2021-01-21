const express = require('express');
const morgan = require('morgan');

const app = express();

// Variables 
app.set('port', process.env.PORT || 4001);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.use('/api/projects',require('./routes/projects.routes'));
app.use('/api/projects_catalog',require('./routes/projects_catalog.routes'));//
app.use('/api/contractors',require('./routes/contractors.routes'));
app.use('/api/services',require('./routes/services.routes'));
app.use('/api/users',require('./routes/users.routes'));
//app.use('/api/projects',require('./routes/projects.routes'));//
//app.use('/api/projects',require('./routes/projects.routes'));
//app.use('/api/projects',require('./routes/projects.routes'));
//app.use('/api/projects',require('./routes/projects.routes'));

module.exports = app;