const pool = require('../database');

const taskCtrl = {}

taskCtrl.getTasks = async (req, res) => {
    const Tasks = await pool.query('SELECT * FROM veyron_arqbid.t_v_tasks WHERE task_done = 0 AND task_ack = 0 AND task_end <= now();'); // 
    res.send(Tasks);
    console.log(Tasks);
};

taskCtrl.createTask = async(req, res) => {
    const {
        id_Task_type,
        id_Task_client,
        id_Task_contractor,
        Task_name,
        Task_registration,
        Task_start,
        Task_end,
        Task_code,
        Task_manager,
        Task_details,
        Task_active,
        Task_status,
        Task_budget,
        client_name,
        Task_location,
        advance_payment,
        contractor_name,
        Task_area,
        Task_type_d} = req.body;
    
    const newTask = {                 
        id_Task:null,
        id_Task_type,
        id_Task_client,
        id_Task_contractor,
        Task_name,
        Task_registration,
        Task_start,
        Task_end,
        Task_code,
        Task_manager,
        Task_details,
        Task_active,
        Task_status,
        Task_budget,
        client_name,
        Task_location,
        advance_payment,
        contractor_name,
        Task_area,
        Task_type_d          
    };

    await pool.query('INSERT INTO t_Tasks set ?', [newTask]);
    
    res.send('message: Task Created...');
    //console.log(req.body);
};

taskCtrl.getTask = async (req, res) => {
    const { id } = req.params;
    const Tasks = await pool.query('SELECT * FROM veyron_arqbid.t_v_Tasks_active WHERE Task_active = true AND id_Task = ?;', [id]);
    res.send(Tasks);
    console.log(Tasks);
};

taskCtrl.editTask = async(req, res) => {
    const { id } = req.params;

    const {
        id_Task_type,
        id_Task_client,
        id_Task_contractor,
        Task_name,
        Task_registration,
        Task_start,
        Task_end,
        Task_code,
        Task_manager,
        Task_details,
        Task_active,
        Task_status,
        Task_budget,
        client_name,
        Task_location,
        advance_payment,
        contractor_name,
        Task_area,
        Task_type_d} = req.body;
    
    const editedTask = {                 
        id_Task_type,
        id_Task_client,
        id_Task_contractor,
        Task_name,
        Task_registration,
        Task_start,
        Task_end,
        Task_code,
        Task_manager,
        Task_details,
        Task_active,
        Task_status,
        Task_budget,
        client_name,
        Task_location,
        advance_payment,
        contractor_name,
        Task_area,
        Task_type_d          
    };

    await pool.query('UPDATE `veyron_arqbid`.`t_Tasks` SET ? WHERE `id_Task` = ?;', [editedTask, id]);
    
    res.send('message: Task Updated... ');
    //console.log(req.body);
};

taskCtrl.deleteTask = async (req, res) => {
    const { id } = req.params;
    //DELETE FROM veyron_arqbid.t_Tasks WHERE id_Task = ?;
    await pool.query("UPDATE `veyron_arqbid`.`t_Tasks` SET `Task_active` = '0' WHERE `id_Task` = ?;", [id]);
    //console.log('Product Updated; '+id);
};

var cronJob = require('node-cron');
// Patrón de cron
// Corre todos los lunes a la 1:00 PM
cronJob.schedule('0 0 17 * * *', async function() {
  // Código a ejecutar
  var Today = new Date();
  console.log('Ejecutado en: ' + Today);

  const Tasks = await pool.query('SELECT * FROM veyron_arqbid.t_v_tasks WHERE task_done = 0 AND task_ack = 0 AND task_end <= now();'); // 

  Tasks.forEach(Task => {
    const accountSid = 'ACfa17fbc2f5b2772e86089ab7f3a3486f'; 
    const authToken = '705bda56c883f71b95c11ba1d1499666'; 
    const client = require('twilio')(accountSid, authToken); 
    
    const message_to = '8441225528';
    const message_body = 'TAREA VENCIDA:\n*'+ Task.task_name +'* / '+ Task.task_duration +'\n*Task End:* '+ Task.task_end;

    client.messages 
        .create({ 
            body: message_body, 
            from: 'whatsapp:+14155238886',       
            to: 'whatsapp:+521' + message_to 
        }) 
        .then(message => console.log(message.sid+'\n'+message_body+'\n')) 
        .done();
    
  });
}, { scheduled: true });

var cronJobToday = require('node-cron');
// Patrón de cron
// Corre todos los lunes a la 1:00 PM
cronJobToday.schedule('0 * * * * *', async function() {
  // Código a ejecutar
  var Today = new Date();
  console.log('Ejecutado en: ' + Today);

  const TasksToday = await pool.query('SELECT * FROM veyron_arqbid.t_v_tasks WHERE task_done = 0 AND task_ack = 0 AND (now() BETWEEN task_start  AND task_end);'); // 

  TasksToday.forEach(TaskToday => {
    const accountSid = 'ACfa17fbc2f5b2772e86089ab7f3a3486f'; 
    const authToken = '705bda56c883f71b95c11ba1d1499666'; 
    const client = require('twilio')(accountSid, authToken); 
    
    const message_to = '8441225528';
    const message_body = 'TAREA DIARIA:\n*'+ TaskToday.task_name +'* / '+ TaskToday.task_duration +'\n*Task End:* '+ TaskToday.task_end;

    client.messages 
        .create({ 
            body: message_body, 
            from: 'whatsapp:+14155238886',       
            to: 'whatsapp:+521' + message_to 
        }) 
        .then(message => console.log(message.sid+'\n'+message_body+'\n')) 
        .done();
    
  });
}, { scheduled: true });

    

module.exports =  taskCtrl;