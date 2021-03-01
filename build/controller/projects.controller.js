const pool = require('../database'); // const { Project } = require('../models/project.model');


const projectCtrl = {};

projectCtrl.getProjects = async (req, res) => {
  const projects = await pool.query('SELECT * FROM veyron_arqbid.t_v_projects_active WHERE project_active = true;');
  res.send(projects);
  console.log(projects);
};

projectCtrl.createProject = async (req, res) => {
  const {
    id_project_type,
    id_project_client,
    id_project_contractor,
    project_name,
    project_registration,
    project_start,
    project_end,
    project_code,
    project_manager,
    project_details,
    project_active,
    project_status,
    project_budget,
    client_name,
    project_location,
    advance_payment,
    contractor_name,
    project_area,
    project_type_d
  } = req.body;
  const newProject = {
    id_project: null,
    id_project_type,
    id_project_client,
    id_project_contractor,
    project_name,
    project_registration,
    project_start,
    project_end,
    project_code,
    project_manager,
    project_details,
    project_active,
    project_status,
    project_budget,
    client_name,
    project_location,
    advance_payment,
    contractor_name,
    project_area,
    project_type_d
  };
  await pool.query('INSERT INTO t_projects set ?', [newProject]).then(function (result) {
    sendResponse(res, "Project inserted", result.insertId);
  }).catch(function (error) {
    sendResponse(res, "error", null, error);
  });
  res.send('message: Project Created...'); //console.log(req.body);
};

projectCtrl.getProject = async (req, res) => {
  const {
    id
  } = req.params;
  const projects = await pool.query('SELECT * FROM veyron_arqbid.t_v_projects_active WHERE project_active = true AND id_project = ?;', [id]);
  res.send(projects);
  console.log(projects);
};

projectCtrl.editProject = async (req, res) => {
  const {
    id
  } = req.params;
  const {
    id_project_type,
    id_project_client,
    id_project_contractor,
    project_name,
    project_registration,
    project_start,
    project_end,
    project_code,
    project_manager,
    project_details,
    project_active,
    project_status,
    project_budget,
    client_name,
    project_location,
    advance_payment,
    contractor_name,
    project_area,
    project_type_d
  } = req.body;
  const editedProject = {
    id_project_type,
    id_project_client,
    id_project_contractor,
    project_name,
    project_registration,
    project_start,
    project_end,
    project_code,
    project_manager,
    project_details,
    project_active,
    project_status,
    project_budget,
    client_name,
    project_location,
    advance_payment,
    contractor_name,
    project_area,
    project_type_d
  };
  await pool.query('UPDATE `veyron_arqbid`.`t_projects` SET ? WHERE `id_project` = ?;', [editedProject, id]).then(function (result) {
    sendResponse(res, "Project Updated", result.insertId);
  }).catch(function (error) {
    sendResponse(res, "error", null, error);
  });
};

projectCtrl.deleteProject = async (req, res) => {
  const {
    id
  } = req.params; //DELETE FROM veyron_arqbid.t_projects WHERE id_project = ?;

  await pool.query("UPDATE `veyron_arqbid`.`t_projects` SET `project_active` = '0' WHERE `id_project` = ?;", [id]).then(function (result) {
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

module.exports = projectCtrl;