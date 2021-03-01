const pool = require('../database');

const project_CatCtrl = {};

project_CatCtrl.getProjects = async (req, res) => {
  const projects = await pool.query('SELECT * FROM veyron_arqbid.t_v_projects_type WHERE projects_status = true;');
  res.send(projects);
  console.log(projects);
};

project_CatCtrl.createProject = async (req, res) => {
  const {
    id_project_type,
    project_name,
    project_registration,
    project_duration,
    project_code,
    project_manager,
    project_details,
    projects_status,
    project_type
  } = req.body;
  const newProject = {
    id_project_type: null,
    project_name,
    project_registration,
    project_duration,
    project_code,
    project_manager,
    project_details,
    projects_status,
    project_type
  };
  await pool.query('INSERT INTO t_projects_types set ?', [newProject]).then(function (result) {
    sendResponse(res, "Project inserted", result.insertId);
  }).catch(function (error) {
    sendResponse(res, "error", null, error);
  });
  res.send('message: Project Created...'); //console.log(req.body);
};

project_CatCtrl.getProject = async (req, res) => {
  const {
    id
  } = req.params;
  const projects = await pool.query('SELECT * FROM veyron_arqbid.t_v_projects_type WHERE projects_status = true AND id_project_type = ?;', [id]);
  res.send(projects);
  console.log(projects);
};

project_CatCtrl.editProject = async (req, res) => {
  const {
    id
  } = req.params;
  const {
    //id_project_type,
    project_name,
    project_registration,
    project_duration,
    project_code,
    project_manager,
    project_details,
    projects_status,
    project_type
  } = req.body;
  const editedProject = {
    id_project_type: null,
    project_name,
    project_registration,
    project_duration,
    project_code,
    project_manager,
    project_details,
    projects_status,
    project_type
  };
  await pool.query('UPDATE `veyron_arqbid`.`t_projects_types` SET ? WHERE `id_project_type` = ?;', [editedProject, id]).then(function (result) {
    sendResponse(res, "Project Updated", result.insertId);
  }).catch(function (error) {
    sendResponse(res, "error", null, error);
  });
};

project_CatCtrl.deleteProject = async (req, res) => {
  const {
    id
  } = req.params; //DELETE FROM veyron_arqbid.t_projects WHERE id_project = ?;

  await pool.query("UPDATE`veyron_arqbid`.`t_projects_types` SET `projects_status` = '0' WHERE `id_project_type` = ?;", [id]).then(function (result) {
    sendResponse(res, "Project Deleted", result.insertId);
  }).catch(function (error) {
    sendResponse(res, "error", null, error);
  });
};

function sendResponse(res, action, tid, error) {
  if (action == "error") console.log(error);
  var result = {
    action: action
  };
  if (tid !== undefined && tid !== null) result.tid = tid;
  res.send(result);
}

module.exports = project_CatCtrl;