const pool = require('../database');
var Promise = require('bluebird');
require("date-format-lite");

const ganttCtrl = {}

ganttCtrl.getGraphics = async (req, res) => {
    Promise.all([
        pool.query("SELECT * FROM veyron_arqbid.t_v_tasks_ganttid;"), //t_v_tasks_ganttid // WHERE id <= 10
        pool.query("SELECT * FROM veyron_arqbid.t_v_task_links;") //t_v_task_links // WHERE id <= 10
      ]).then(function(results){
        var tasks = results[0],
        links = results[1];
     
        for (var i = 0; i < tasks.length; i++) {
          //tasks[i].start_date = tasks[i].start_date.format("YYYY-MM-DD hh:mm:ss");
          tasks[i].open = true;
        }
     
        res.send({
          data: tasks,
          collections: { links: links }
        });
     
      }).catch(function(error) {
        console.log(res, "error", null, error); //sendResponse
      });
};


ganttCtrl.getGraphic = async (req, res) => {
  const { id } = req.params;
  Promise.all([
      pool.query("SELECT * FROM veyron_arqbid.t_v_tasks_ganttid WHERE id = ?;", id), //t_v_tasks_ganttid // WHERE id <= 10
      pool.query("SELECT * FROM veyron_arqbid.t_v_task_links;") //t_v_task_links // WHERE id <= 10
    ]).then(function(results){
      var tasks = results[0],
      links = results[1];
   
      for (var i = 0; i < tasks.length; i++) {
        //tasks[i].start_date = tasks[i].start_date.format("YYYY-MM-DD hh:mm:ss");
        tasks[i].open = true;
      }
   
      res.send({
        data: tasks,
        collections: { links: links }
      });
   
    }).catch(function(error) {
      console.log(res, "error", null, error); //sendResponse
    });
};

ganttCtrl.getTasks = async (req, res) => {
  const Tasks = await pool.query('SELECT * FROM veyron_arqbid.t_project_tasks;'); // 
  res.send(Tasks);
  console.log(Tasks);
};

ganttCtrl.saveNewTask = async (req, res) => {  
  const {
    id_project,
    task_name,
    task_duration,
    task_start,
    task_end,
    percent_complete,
    task_predecesor,
    parent,
    id_created_by,
    task_done,
    task_ack,
    id_responsible,
    task_registration,
    created_at,
    updated_at } = req.body;

  const newTask = {
    id_task:null, 
    id_project,
    task_name,
    task_duration,
    task_start: task_start.date("YYYY-MM-DD"),
    task_end: task_end.date("YYYY-MM-DD"),
    percent_complete,
    task_predecesor,
    parent,
    id_created_by,
    task_done,
    task_ack,
    id_responsible,
    task_registration,
    created_at:null,
    updated_at:null
  };

  await pool.query("INSERT INTO veyron_arqbid.t_project_tasks SET ?;", [newTask])  
  .then (function (result) {
    sendResponse(res, "Task inserted", result.insertId);
  })
  .catch(function(error) {
    sendResponse(res, "error", null, error); 
  });
};

// update a link
ganttCtrl.updateTask = async (req, res) => {
  var id = req.params.id;
  
  const {    
    id_project,
    task_name,
    task_duration,
    task_start,
    task_end,
    percent_complete,
    task_predecesor,
    parent,
    id_created_by,
    task_done,
    task_ack,
    id_responsible,
    task_registration,
    created_at,
    updated_at } = req.body;

  const editTask = { 
    id_project,
    task_name,
    task_duration,
    task_start: task_start.date("YYYY-MM-DD"),
    task_end: task_end.date("YYYY-MM-DD"),
    percent_complete,
    task_predecesor,
    parent,
    id_created_by,
    task_done,
    task_ack,
    id_responsible,
    task_registration,
    created_at:null,
    updated_at:null
  };
  
  
  link = getLink(req.body);
 
  await pool.query("UPDATE veyron_arqbid.t_project_tasks SET ? WHERE id_task = ?", [editTask, id])
  .then (function (result) {
    sendResponse(res, "{message:Tasks ${id} updated}");
  })
  .catch(function(error) {
    sendResponse(res, "error", null, error); 
  });
};

// delete a link
ganttCtrl.deleteTask = async (req, res) => {
  var sid = req.params.id;
  await pool.query("DELETE FROM veyron_arqbid.t_project_tasks WHERE id_task = ?",[sid])
  .then (function (result) {
    sendResponse(res, "Task Deleted", result.insertId);
  })
  .catch(function(error) {
    sendResponse(res, "error", null, error); 
  });
};

function getTask(data) {
  return {
    text: data.text,
    start_date: data.start_date.date("YYYY-MM-DD"),
    duration: data.duration,
    progress: data.progress || 0,
    parent: data.parent
  };
}
 
function getLink(data) {
  return {
    source: data.source,
    target: data.target,
    type: data.type
  };
}
 
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

module.exports =  ganttCtrl;