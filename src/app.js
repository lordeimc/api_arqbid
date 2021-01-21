const express = require('express');
const morgan = require('morgan');

const app = express();

// Variables 
app.set('port', process.env.PORT || 4001);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.use('/api/projects',require('./routes/projects.routes'));

module.exports = app;