const { app } = require('../app');
const pool = require('../database');
var twilio = require('twilio');
const nodemailer = require("nodemailer");

const messageCtrl = {}

messageCtrl.createService = async(req, res) => {
    
    //await pool.query('INSERT INTO t_Services set ?', [newService]);

    const {message_body, message_to} = req.body;
    //console.log(req.body);   

    const accountSid = 'ACfa17fbc2f5b2772e86089ab7f3a3486f'; // app.get('TWILIO_ACCOUNT_SID') 
    const authToken = '705bda56c883f71b95c11ba1d1499666'; // app.get('TWILIO_AUTH_TOKEN')
    const client = require('twilio')(accountSid, authToken); 
    
    client.messages 
    .create({ 
        body: message_body, 
        from: 'whatsapp:+14155238886',       
        to: 'whatsapp:' + message_to 
    }) 
    .then(message => res.send(message.sid+'\n'+message_body)) 
    .done(console.log("Mensaje Enviado: ("+message_to+')\n'+message_body+'\n'));
};

messageCtrl.createEmail = async(req, res) => {

    const {email_from, email_to, email_subject, email_text, email__body} = req.body;
    // Generate test SMTP service account from ethereal.email
      // Only needed if you don't have a real mail account for testing
      let testAccount = await nodemailer.createTestAccount();
    
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: testAccount.user, // generated ethereal user
          pass: testAccount.pass, // generated ethereal password
        },
      });
    
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: "bar@example.com, baz@example.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      });
    
      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};
    
//this.messageCtrl.createEmail().catch(console.error);

function sendResponse(res, action, tid, error) {
 
  if (action == "error")
    console.log(error);
 
  var result = {
    action: action
  };
  if (tid !== undefined && tid !== null)
    result.tid = tid;
 
  res.send(result);
}

module.exports =  messageCtrl;