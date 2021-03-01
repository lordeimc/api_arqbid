const pool = require('../database');

const contractorCtrl = {}

contractorCtrl.getContractors = async (req, res) => {
    const Contractors = await pool.query('SELECT * FROM veyron_arqbid.t_contractor WHERE contractor_active = true AND id_contractor_type = 3;');
    res.send(Contractors);
    console.log(Contractors);
};

contractorCtrl.createContractor = async(req, res) => {
    const {
        id_contractor,
        id_contractor_type=3,
        contractor_name,
        contractor_legal_name,
        contractor_charge,
        contractor_phone_c,
        contractor_street,
        contractor_colonia,
        contractor_city,
        contractor_State,
        contractor_email,
        contractor_phone,
        contractor_location,
        contractor_provider,
        contractor_active,
        contractor_website,
        created_at,
        updated_at} = req.body;
    
    const newContractor = {                 
        id_contractor:null,
        id_contractor_type:3,
        contractor_name,
        contractor_legal_name,
        contractor_charge,
        contractor_phone_c,
        contractor_street,
        contractor_colonia,
        contractor_city,
        contractor_State,
        contractor_email,
        contractor_phone,
        contractor_location,
        contractor_provider,
        contractor_active:1,
        contractor_website,
        created_at:Date,
        updated_at:Date          
    };

    await pool.query('INSERT INTO `veyron_arqbid`.`t_contractor` set ?', [newContractor])
    .then (function (result) {
        sendResponse(res, "Contractor inserted", result.insertId);
      })
      .catch(function(error) {
        sendResponse(res, "error", null, error); 
      });
    
    res.send('message: Contractor Created...');
    //console.log(req.body);
};

contractorCtrl.getContractor = async (req, res) => {
    const { id } = req.params;
    const Contractors = await pool.query('SELECT * FROM veyron_arqbid.t_contractor WHERE id_Contractor = ?;', [id]);
    res.send(Contractors);
    console.log(Contractors);
};

contractorCtrl.editContractor = async(req, res) => {
    const { id } = req.params;

    const {
        id_contractor_type,
        contractor_name,
        contractor_legal_name,
        contractor_charge,
        contractor_phone_c,
        contractor_street,
        contractor_colonia,
        contractor_city,
        contractor_State,
        contractor_email,
        contractor_phone,
        contractor_location,
        contractor_provider,
        contractor_website
        } = req.body;
    
    const editedContractor = {                 
        id_contractor_type:3,
        contractor_name,
        contractor_legal_name,
        contractor_charge,
        contractor_phone_c,
        contractor_street,
        contractor_colonia,
        contractor_city,
        contractor_State,
        contractor_email,
        contractor_phone,
        contractor_location,
        contractor_provider,
        contractor_website       
    };

    await pool.query("UPDATE `veyron_arqbid`.`t_contractor` SET ? WHERE id_Contractor = ?;", [editedContractor, id])
    .then (function (result) {
        sendResponse(res, "Provider Updated", result.insertId);
      })
      .catch(function(error) {
        sendResponse(res, "error", null, error); 
      });
};

contractorCtrl.deleteContractor = async (req, res) => {
    const { id } = req.params;
    //DELETE FROM veyron_arqbid.t_Contractors WHERE id_Contractor = ?;
    const Contractors = await pool.query("UPDATE veyron_arqbid.t_contractor SET contractor_active = '0' WHERE id_Contractor = ?;", [id]).then (function (result) {
      sendResponse(res, "Provider Deleted", result.insertId);
    })
    .catch(function(error) {
      sendResponse(res, "error", null, error); 
    });
};

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

module.exports =  contractorCtrl;