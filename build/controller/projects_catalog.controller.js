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
  await pool.query('INSERT INTO t_projects_types set ?', [newProject]);
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
  const edited = await pool.query('UPDATE `veyron_arqbid`.`t_projects_types` SET ? WHERE `id_project_type` = ?;', [editedProject, id]);

  if (edited) {
    res.send('message: Project Updated... ');
  } else {
    res.send('message: Project Not Updated... ');
  } //console.log(req.body);

};

project_CatCtrl.deleteProject = async (req, res) => {
  const {
    id
  } = req.params; //DELETE FROM veyron_arqbid.t_projects WHERE id_project = ?;

  await pool.query("UPDATE `veyron_arqbid`.`t_projects_types` SET `projects_status` = '0' WHERE `id_project_type` = ?;", [id]);
  console.log('Project Updated; ' + id);
  res.send('message: Project id (' + id + ') Deleted... ');
};

module.exports = project_CatCtrl;