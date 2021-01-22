const pool = require('../database');
var twilio = require('twilio');

const messageCtrl = {}


messageCtrl.createService = async(req, res) => {
    
    //await pool.query('INSERT INTO t_Services set ?', [newService]);
    
    const {message_body, message_to} = req.body;
    //console.log(req.body);   


    const accountSid = 'ACfa17fbc2f5b2772e86089ab7f3a3486f'; 
    const authToken = '705bda56c883f71b95c11ba1d1499666'; 
    const client = require('twilio')(accountSid, authToken); 
    
    client.messages 
        .create({ 
            body: message_body, 
            from: 'whatsapp:+14155238886',       
            to: 'whatsapp:+521' + message_to 
        }) 
        .then(message => console.log(message.sid)) 
        .done();
    };

module.exports =  messageCtrl;