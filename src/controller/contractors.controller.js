const pool = require('../database');

const productCtrl = {}

productCtrl.getProjects = async (req, res) => {
    const projects = await pool.query('SELECT * FROM veyron_arqbid.t_v_projects_active WHERE project_active = true;');
    res.send(projects);
    console.log(projects);
};

productCtrl.createProject = async(req, res) => {
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
        project_type_d} = req.body;
    
    const newProject = {                 
        id_project:null,
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

    await pool.query('INSERT INTO t_projects set ?', [newProject]);
    
    res.send('message: Project Created...');
    //console.log(req.body);
};

productCtrl.getProject = async (req, res) => {
    const { id } = req.params;
    const projects = await pool.query('SELECT * FROM veyron_arqbid.t_v_projects_active WHERE project_active = true AND id_project = ?;', [id]);
    res.send(projects);
    console.log(projects);
};

productCtrl.editProject = async(req, res) => {
    const { id } = req.params;

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
        project_type_d} = req.body;
    
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

    await pool.query('UPDATE `veyron_arqbid`.`t_projects` SET ? WHERE `id_project` = ?;', [editedProject, id]);
    
    res.send('message: Project Updated... ');
    //console.log(req.body);
};

productCtrl.deleteProject = async (req, res) => {
    const { id } = req.params;
    //DELETE FROM veyron_arqbid.t_projects WHERE id_project = ?;
    await pool.query("UPDATE `veyron_arqbid`.`t_projects` SET `project_active` = '0' WHERE `id_project` = ?;", [id]);
    //console.log('Product Updated; '+id);
};

module.exports =  productCtrl;