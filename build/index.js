const app = require('./app.js');

app.listen(app.get('port'));
console.log('Server Running on PORT', app.get('port'));