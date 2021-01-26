const express = require('express');

const morgan = require('morgan'); //const cors = require('cors');


const app = express(); // Variables 

app.set('port', process.env.PORT || 4001); //app.use(cors());

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.set('TWILIO_ACCOUNT_SID', "AC35310cc2d90077d133dcd78414cf3825");
app.set('TWILIO_AUTH_TOKEN', "73b2ff64e7aee3cc676f23a71576323e");
app.use('/api/projects', require('./routes/projects.routes'));
app.use('/api/projects_catalog', require('./routes/projects_catalog.routes')); //

app.use('/api/contractors', require('./routes/contractors.routes'));
app.use('/api/services', require('./routes/services.routes'));
app.use('/api/users', require('./routes/users.routes'));
app.use('/api/messages', require('./routes/whatsapp.routes'));
app.use('/api/tasks', require('./routes/tasks.routes')); //
//app.use('/api/auth',require('./routes/auth.routes'));
//app.use('/api/projects',require('./routes/projects.routes'));
//app.use('/api/projects',require('./routes/projects.routes'));

module.exports = app;