const mysql =  require('mysql');
const { promisify } = require('util');

const {database_remote} = require('./keys.js');

const pool = mysql.createPool(database_remote);

pool.getConnection((err, connection) => {
    if (err){
        switch (err.code){
            case 'PROTOCOL_CONNECTION_LOST':
                console.log('DATABASE CONNECTION WAS CLOSED');
                break;
            case 'ER_CON_COUNT_ERROR':
                console.log('DATABASE HAS TO MANY CONNECTIONS');
                break;
            case 'ECONNREFUSED':
                console.log('DATABASE CONNECTION WAS REFUSED');
                break;
            case 'ER_ACCESS_DENIED_ERROR':
                console.log('DATABASE CONNECTION DENIED');
                break;
            case 'ER_BAD_DB_ERROR':
                console.log('DATABASE NOT EXIST.');
                break;
            case 'ENOTFOUND':
                console.log('LOCALHOST NOT EXIST.');
                break;
            case 'ETIMEDOUT':                
                console.log('ETIMEDOUT.');
                break;
            default:
                console.log(err.code,err.message);
        }
    }
    if (connection) connection.release();
    console.log('DATABASE ['+ database_remote.database +'] is Connected at Host: '+ database_remote.host+' by User['+ database_remote.user +'].'); //'+ app.get('port') +
    return;
});

pool.query = promisify(pool.query)





module.exports = pool;