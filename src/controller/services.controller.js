const pool = require('../database');

const serviceCtrl = {}

serviceCtrl.getServices = async (req, res) => {
    const Services = await pool.query('SELECT * FROM veyron_arqbid.t_v_services_active WHERE active = true;');
    res.send(Services);
    console.log(Services);
};

serviceCtrl.createService = async(req, res) => {
    const {
        id_Service_type,
        id_Service_client,
        id_Service_contractor,
        Service_name,
        Service_registration,
        Service_start,
        Service_end,
        Service_code,
        Service_manager,
        Service_details,
        Service_active,
        Service_status,
        Service_budget,
        client_name,
        Service_location,
        advance_payment,
        contractor_name,
        Service_area,
        Service_type_d} = req.body;
    
    const newService = {                 
        id_Service:null,
        id_Service_type,
        id_Service_client,
        id_Service_contractor,
        Service_name,
        Service_registration,
        Service_start,
        Service_end,
        Service_code,
        Service_manager,
        Service_details,
        Service_active,
        Service_status,
        Service_budget,
        client_name,
        Service_location,
        advance_payment,
        contractor_name,
        Service_area,
        Service_type_d          
    };

    await pool.query('INSERT INTO t_Services set ?', [newService]);
    
    res.send('message: Service Created...');
    //console.log(req.body);
};

serviceCtrl.getService = async (req, res) => {
    const { id } = req.params;
    const Services = await pool.query('SELECT * FROM veyron_arqbid.t_v_Services_active WHERE Service_active = true AND id_Service = ?;', [id]);
    res.send(Services);
    console.log(Services);
};

serviceCtrl.editService = async(req, res) => {
    const { id } = req.params;

    const {
        id_Service_type,
        id_Service_client,
        id_Service_contractor,
        Service_name,
        Service_registration,
        Service_start,
        Service_end,
        Service_code,
        Service_manager,
        Service_details,
        Service_active,
        Service_status,
        Service_budget,
        client_name,
        Service_location,
        advance_payment,
        contractor_name,
        Service_area,
        Service_type_d} = req.body;
    
    const editedService = {                 
        id_Service_type,
        id_Service_client,
        id_Service_contractor,
        Service_name,
        Service_registration,
        Service_start,
        Service_end,
        Service_code,
        Service_manager,
        Service_details,
        Service_active,
        Service_status,
        Service_budget,
        client_name,
        Service_location,
        advance_payment,
        contractor_name,
        Service_area,
        Service_type_d          
    };

    await pool.query('UPDATE `veyron_arqbid`.`t_Services` SET ? WHERE `id_Service` = ?;', [editedService, id]);
    
    res.send('message: Service Updated... ');
    //console.log(req.body);
};

serviceCtrl.deleteService = async (req, res) => {
    const { id } = req.params;
    //DELETE FROM veyron_arqbid.t_Services WHERE id_Service = ?;
    await pool.query("UPDATE `veyron_arqbid`.`t_Services` SET `Service_active` = '0' WHERE `id_Service` = ?;", [id]);
    //console.log('Product Updated; '+id);
};

module.exports =  serviceCtrl;